import { Component } from '@angular/core';
import { FavoriteService, Favorite } from '../../services/favorite.service'; 
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage {
  pokemon: any;
  favorites: Favorite[] = []; 

  constructor(private favoriteService: FavoriteService) {}

  loadFavorites() {
    this.favoriteService.getFavorites().subscribe(
      (favorites: Favorite[]) => {
        this.favorites = favorites;
      },
      (error: any) => console.error(error)
    );
  }
}