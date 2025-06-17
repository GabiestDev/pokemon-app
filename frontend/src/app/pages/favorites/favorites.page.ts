import { Component } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';

// Interface para tipagem
export interface Favorite {
  id: number;
  pokemon_id: number;
  name: string;
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {
  favorites: Favorite[] = []; 

  constructor(private favoriteService: FavoriteService) {}

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoriteService.getFavorites().subscribe({
      next: (data: Favorite[]) => {
        this.favorites = data;
      },
      error: (err: any) => { 
        console.error('Error loading favorites', err);
      }
    });
  }
}