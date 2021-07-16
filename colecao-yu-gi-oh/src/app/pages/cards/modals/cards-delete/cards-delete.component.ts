import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Card } from '../../cards.models';
import { CardsService } from '../../cards.service';

@Component({
  selector: 'app-cards-delete',
  templateUrl: './cards-delete.component.html',
  styleUrls: ['./cards-delete.component.sass']
})
export class CardsDeleteComponent implements OnInit {

  @Input() card?: Card;

  constructor(
    private cardsService: CardsService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  close(card?: Card) {
    this.activeModal.close(card);
  }

  delete() {

    if(this.card?.id){
      this.cardsService
      .delete(this.card.id)
      .subscribe(() => this.close(this.card));
    }
    
  }

}
