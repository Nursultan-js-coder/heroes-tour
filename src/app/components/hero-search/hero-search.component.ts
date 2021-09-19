import { Component, OnInit } from '@angular/core';

import { Observable, Subject,of} from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap,catchError
} from 'rxjs/operators';

import { IHero } from '../../../IHero';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes?: Observable<IHero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroesService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    console.log(term);
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    this.heroes = this.searchTerms.pipe(
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap(
        term =>
          term // switch to new observable each time
            ? // return the http search observable
            this.heroService.searchHeroes(term)
            : // or the observable of empty heroes if no search term
            of<IHero[]>([])
      ),
      catchError(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return of<IHero[]>([]);
      })
    );
    this.heroes.subscribe((res)=>{
      console.log("heroes:",res);
    })


  }
}
