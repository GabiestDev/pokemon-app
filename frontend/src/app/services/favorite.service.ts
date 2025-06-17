import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Favorite {
  id: number;
  pokemon_id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = `${environment.apiUrl}/favorites`;

  constructor(private http: HttpClient) { }

  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.apiUrl);
  }

  toggleFavorite(pokemon: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/toggle`, {
      pokemon_id: pokemon.id,
      name: pokemon.name
    });
  }
}