import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { Hero } from '../hero';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private heroService:HeroService,
    private location: Location,
  ) {}
  ngOnInit(): void {
  
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
