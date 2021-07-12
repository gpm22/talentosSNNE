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
 
  constructor(
    private apiService: ApiService
  ) { }
  
  ngOnInit(): void {
  }

  OnInput(event: any) {
    this.carta.emit(event.target.value);
  }
  
  newDeck() {
    this.apiService
      .postDeck()
      .subscribe((deck) => this.onNewDeck.emit(deck));
  }
}
