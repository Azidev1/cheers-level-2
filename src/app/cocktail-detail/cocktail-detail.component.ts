import {Component, inject, Signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CocktailService} from "../services/cocktail.service";
import {Cocktail} from "../models.type";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'cocktail-detail',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './cocktail-detail.component.html',
  styleUrl: './cocktail-detail.component.scss'
})
export class CocktailDetailComponent {
  service: CocktailService = inject(CocktailService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private readonly cocktailId: string = this.activatedRoute.snapshot.paramMap.get("cocktailId") ?? "";
  cocktail: Signal<Cocktail | undefined> = this.service.getCocktailDetail(this.cocktailId);

}
