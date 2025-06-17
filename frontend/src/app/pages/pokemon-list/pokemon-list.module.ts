import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PokemonListPage } from './pokemon-list.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{
      path: '',
      component: PokemonListPage
    }])
  ],
  declarations: [PokemonListPage]
})
export class PokemonListPageModule {}