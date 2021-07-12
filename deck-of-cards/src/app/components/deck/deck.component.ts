import { Component, Input, OnInit} from '@angular/core';
import { Card, Deck } from 'src/app/services/api.models';
import { ApiService } from 'src/app/services/api.service';
 
@Component({
 selector: 'app-deck',
 templateUrl: './deck.component.html',
 styleUrls: ['./deck.component.sass']
})
export class DeckComponent implements OnInit {
 
  @Input() deck: Deck = {};

  public cards: Card[] = [];
  @Input() draw: boolean = false;
  @Input()carta: String = "nada";
  
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

    if(this.cards.length == 1) {
      if (this.carta == "par" && (this.cards[0].code[0]=="2" || this.cards[0].code[0]=="4" || this.cards[0].code[0]=="6" || this.cards[0].code[0]=="8" || this.cards[0].code[0]=="0" || this.cards[0].code[0]=="Q")){
        alert("Acertou!!!!!!");
      } else if (this.carta == "impar" && (this.cards[0].code[0]=="A" || this.cards[0].code[0]=="3" || this.cards[0].code[0]=="5" || this.cards[0].code[0]=="7" || this.cards[0].code[0]=="9" || this.cards[0].code[0]=="J" || this.cards[0].code[0]=="K")){
        alert("Acertou!!!!!!");
      } else {
        alert("Errou!!!!!!");
      }
    }
  }
}