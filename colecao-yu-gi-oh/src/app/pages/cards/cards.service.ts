import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Card } from './cards.models';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll() {
    return this.httpClient.get<Card[]>(`${environment.api}/cards`);
  }

  delete(id: string) {
    return this.httpClient.delete<Card>(`${environment.api}/cards/${id}`);
  }

  save(card: Card) {
    if (card.id) {
      return this.httpClient.put<Card>(`${environment.api}/cards/${card.id}`, card);
    } else {
      return this.httpClient.post<Card>(`${environment.api}/cards`, card);
    }
  }
}