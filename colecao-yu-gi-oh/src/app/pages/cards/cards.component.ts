import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Card } from './cards.models';
import { CardsService } from './cards.service';
import { CardsDeleteComponent } from './modals/cards-delete/cards-delete.component';
import { CardsFormComponent } from './modals/cards-form/cards-form.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.sass']
})
export class CardsComponent implements OnInit {

  public cards: Card[] = [];

  constructor(
    private cardsService: CardsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.cardsService
      .getAll()
      .subscribe((cards) => this.cards = cards);
  }

  add() {
    const modalRef = this.modalService.open(CardsFormComponent);
    modalRef.result
      .then((card) => {
        this.cards.push(card);
      });
  }

  edit(card: Card) {
    const modalRef = this.modalService.open(CardsFormComponent);
    modalRef.componentInstance.card =card;
    modalRef.result
      .then((card) => {
        const cardIndex = this.cards.findIndex((x) => x.id === card.id);
        this.cards[cardIndex] = card;
      });
  }

  delete(card: Card) {
    const modalRef = this.modalService.open(CardsDeleteComponent);
    modalRef.componentInstance.card = card;
    modalRef.result
      .then((card) => {
        this.cards = this.cards.filter((x) => x.id !== card.id);
      });
  }

}
