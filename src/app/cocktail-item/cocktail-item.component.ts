import {Component, input, output} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Cocktail} from "../models.type";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'cocktail-item',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    RouterLink
  ],
  templateUrl: './cocktail-item.component.html',
  styleUrl: './cocktail-item.component.scss'
})
export class CocktailItemComponent {
  cocktail = input.required<Cocktail>();
  isStar = input.required<boolean>();
  manageStar = output<Cocktail>();
}
