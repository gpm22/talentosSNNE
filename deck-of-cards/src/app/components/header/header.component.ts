import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Deck } from 'src/app/services/api.models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Output() onNewDeck: EventEmitter<Deck> = new EventEmitter<Deck>();
  @Output() carta: EventEmitter<String> = new EventEmitter<String>();

  selectedOption?: String;

  options = [
    { name: "par", value: "par" },
    { name: "impar", value: "impar" }
  ]
 
  constructor(
    private apiService: ApiService
  ) { }
  
  ngOnInit(): void {
  }
  
  newDeck() {
    this.apiService
      .postDeck()
      .subscribe((deck) => this.onNewDeck.emit(deck));

    this.carta.emit(this.selectedOption); 
  }
}
