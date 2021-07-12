import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Deck, Draw } from './api.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }


  getDeckDraw(deckId: string = "new", numberOfCards: number = 1): Observable<Draw> {
    return this.httpClient.get<Draw>(`${environment.apiUrl}/deck/${deckId}/draw/?count=${numberOfCards}`);
  }
    
  postDeck() { 
    return this.httpClient.get<Deck>(`${environment.apiUrl}/deck/new/shuffle/?deck_count=1`, {});
  }
}
