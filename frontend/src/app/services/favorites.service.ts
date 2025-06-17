import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = `${environment.apiUrl}/favorites`;

  constructor(private http: HttpClient) { }

  toggleFavorite(pokemon: any) {
    return this.http.post(`${this.apiUrl}/toggle`, {
      pokemon_id: pokemon.id,
      name: pokemon.name
    });
  }

  getFavorites() {
    return this.http.get(this.apiUrl);
  }
}