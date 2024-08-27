import {computed, inject, Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {Cocktail} from "../models.type";

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private http = inject(HttpClient);

  readonly cocktails: Signal<Cocktail[]> = toSignal(this.http.get<Cocktail[]>("cocktails"), {initialValue: []});
  filtersCocktail: WritableSignal<string> = signal('');
  starCocktails = signal<Cocktail[]>([]);
  filteredCocktails: Signal<Cocktail[]> = computed(() => {
    if (this.cocktails() && this.filtersCocktail()) {
      return this.cocktails().filter(value => value.name.toLowerCase().includes(this.filtersCocktail().toLowerCase()));
    }
    if (this.cocktails()) {
      return this.cocktails();
    }
    return [];
  });

  constructor() {
    toObservable(this.cocktails)
      .subscribe(list => {
        let starsInStorage: (string | null) = window.localStorage.getItem('starCocktails');
        if (starsInStorage) {
          let stars: string[] = starsInStorage.split(',');
          let filtered: Cocktail[] = list.filter(value => stars.includes(value.id));
          this.starCocktails.set(filtered);
        }
      })
  }

  getCocktailDetail(cocktailId: string): Signal<Cocktail | undefined> {
    return toSignal(this.http.get<Cocktail>(`cocktails/${cocktailId}`), {initialValue: undefined});
  }

  manageStar(cocktail?: Cocktail) {
    if (!cocktail)
      return;
    let found: (Cocktail | undefined) = this.starCocktails().find(value => value.id === cocktail.id);
    if (found) {
      let filtered: Cocktail[] = this.starCocktails().filter(value => value.id !== cocktail.id);
      this.starCocktails.set(filtered);
    } else {
      this.starCocktails.set([...this.starCocktails(), cocktail]);
    }
    this.storeStars();
  }

  isStar(cocktail?: Cocktail): boolean {
    if (!cocktail)
      return false;
    let found: (Cocktail | undefined) = this.starCocktails().find(value => value.id === cocktail.id);
    return found != null;
  }

  private storeStars() {
    let ids: (string | undefined) = this.starCocktails()?.map(value => value.id).join(',');
    if (ids) {
      window.localStorage.setItem('starCocktails', ids);
    } else {
      window.localStorage.setItem('starCocktails', '');
    }
  }
}
