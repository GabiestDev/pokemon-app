import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

export interface PokemonListResponse {
  results: { name: string; url: string }[];
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = environment.pokeApiUrl;

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number, limit: number): Observable<Pokemon[]> {
    return this.http.get<PokemonListResponse>(
      `${this.apiUrl}/pokemon?offset=${offset}&limit=${limit}`
    ).pipe(
      map(response => {
        return response.results.map((pokemon, index) => ({
          id: offset + index + 1,
          name: pokemon.name,
          image: `${environment.imageUrl}/${offset + index + 1}.png`
        }));
      })
    );
  }
}