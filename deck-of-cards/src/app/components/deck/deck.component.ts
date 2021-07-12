import { Component, Input, OnInit} from '@angular/core';
import { Card, Deck } from 'src/app/services/api.models';
import { ApiService } from 'src/app/services/api.service';
 
@Component({
 selector: 'app-deck',
 templateUrl: './deck.component.html',
 styleUrls: ['./deck.component.sass']
})
export class DeckComponent implements OnInit {
 
  @Input() deck: Deck = {}; //Vverificar se é isso aqui;

  public cards: Card[] = [];
  @Input() draw: boolean = false;
  @Input() carta?: String;
  
  constructor(
    private apiService: ApiService
  ) { }
  
  ngOnInit(): void {
    this.apiService
      .getDeckDraw(this.deck.deck_id, 52)
      .subscribe((draw) => this.cards = draw.cards);
  }
  
  deckDraw() {
    this.apiService
      .getDeckDraw(this.deck.deck_id)
      .subscribe((draw) => this.cards = draw.cards);

    this.draw = false;

    if (this.carta == this.cards[0].code){
      alert("Acertou!!!!!!");
    } else {
      alert("Errou!!!!!!");
    }
  }
}