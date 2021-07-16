import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CARD_TYPES, MONSTER_TYPES } from '../../cards.constants';
import { Card, CardType, MonsterType } from '../../cards.models';
import { CardsService } from '../../cards.service';

@Component({
  selector: 'app-cards-form',
  templateUrl: './cards-form.component.html',
  styleUrls: ['./cards-form.component.sass']
})
export class CardsFormComponent implements OnInit, OnDestroy {

  @Input() card?: Card;

  get cardTypes() {
    return Object
      .values(CardType)
      .map(value => {
        return {
          label: CARD_TYPES[value],
          value: value,
        }
      });
  }

  get monsterTypes() {

    return Object
      .values(MonsterType)
      .map(value => {
        return {
          label: MONSTER_TYPES[value],
          value: value,
        }
      });
  }

  public cardForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null),
    monsterType: new FormControl(null),
    cardType: new FormControl(null),
    level: new FormControl(null),
    ATK : new FormControl(null),
    DEF : new FormControl(null),
    text: new FormControl(null),
    img : new FormControl(null),
  });

  public showFeedbackOnlyPlay = false;

  private subscriptions = new Subscription();


  constructor(
    private cardsService: CardsService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadForm() {
    if (this.card) {
      this.cardForm.patchValue(this.card);
    }
  }

  close(card?: Card) {
    this.activeModal.close(card);
  }

  submit() {
    const card: Card = this.cardForm.value;

    debugger;

    if (this.cardForm.invalid) {
      return;
    }

    this.cardsService
      .save(card)
      .subscribe((card) => this.close(card));
  }

}
