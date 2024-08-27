import {Component, inject, OnInit} from '@angular/core';
import {CocktailItemComponent} from "../cocktail-item/cocktail-item.component";
import {CocktailService} from "../services/cocktail.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'cocktail-list',
  standalone: true,
  imports: [
    CocktailItemComponent,
    NgForOf,
    NgIf,
  ],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss'
})
export class CocktailListComponent implements OnInit {
  service: CocktailService = inject(CocktailService);

  ngOnInit(): void {
    this.service.filtersCocktail.set('');
  }
}
