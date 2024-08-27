import {Routes} from '@angular/router';
import {CocktailListComponent} from "./cocktail-list/cocktail-list.component";
import {CocktailDetailComponent} from "./cocktail-detail/cocktail-detail.component";

export const routes: Routes = [
  {path: '', redirectTo: '/cocktails', pathMatch: "full"},
  {path: 'cocktails', component: CocktailListComponent},
  {path: 'cocktails/:cocktailId', component: CocktailDetailComponent}
];
