import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Deck } from 'src/app/services/api.models';
import { ApiService } from './services/api.service';
 
@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
 
 public deck: Deck = {};
 public draw: boolean = false;
 @Input() carta?: String;
 @Output() cartaSaida: EventEmitter<String> = new EventEmitter<String>();
 
 constructor(
 private apiService: ApiService
 ) { }
 
 ngOnInit() {
  this.newDeck();
 }
 
 onNewDeck(deck: Deck) {
  this.deck = deck;
  this.draw = true;
 }

 newCarta(carta: String){
   this.carta = carta;
   this.cartaSaida.emit(this.carta);
 }

 drawed(){
   this.draw = false;
 }
 
 newDeck() {
  this.apiService
    .postDeck()
    .subscribe((deck) => this.deck = deck);
 }
}