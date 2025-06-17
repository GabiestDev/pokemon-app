import { Component } from '@angular/core';
import { PokemonService, Pokemon } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemons: Pokemon[] = [];
  offset = 0;
  limit = 20;

  constructor(private pokeService: PokemonService) {}

  ionViewDidEnter() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokeService.getPokemonList(this.offset, this.limit).subscribe({
      next: (data) => {
        this.pokemons = [...this.pokemons, ...data];
      },
      error: (err) => {
        console.error('Error loading pokemons', err);
        // Adicione tratamento de erro visual aqui
      }
    });
  }

  loadMore(event: any) {
    this.offset += this.limit;
    this.loadPokemons();
    event.target.complete();
  }
}