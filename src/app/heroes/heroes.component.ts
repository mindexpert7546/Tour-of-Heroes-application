import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { Location } from '@angular/common';
import {
  NgFor,
  NgIf,
  UpperCasePipe,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from "../hero-detail/hero-detail.component";
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrl: './heroes.component.css',
    standalone: true,
    imports: [
        FormsModule,
        NgIf,
        NgFor,
        UpperCasePipe,
        HeroDetailComponent,
        RouterLink,
        HttpClientModule
    ]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  addHeroes:Hero={
    id: 0,
    heroes: ''
  }
  constructor(
    private heroService: HeroService,
    private messageService:MessageService,
    private location: Location,
    ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      res => {
        console.log(res);
        this.heroes = res;
      }
    )
  }


  selectedHero?: Hero;
  onSelect(hero: Hero): void {
  this.selectedHero = hero;
  this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
}

goBack(): void {
  this.location.back();
}

// In your component
addHero(heroes: string): void {
  if (!heroes) { return; }
  this.heroService.addHero({ heroes } as unknown as Hero).subscribe({
    next: (hero) => {
     this.goBack();
    },
    error: (err) => {
      // Handle error
    },
    complete: () => this.goBack() // Or any other logic after completion
  });
}

}
