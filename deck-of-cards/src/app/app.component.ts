import { Component, OnInit, Input } from '@angular/core';
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
 public carta: String = "";
 
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