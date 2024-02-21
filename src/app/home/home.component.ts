import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private heroService:HeroService,
    private location: Location,
    private messageService:MessageService
  ) {}
  ngOnInit(): void {
  
  }

  goBack(): void {
    this.location.back();
  }
  
  // In your component
  addHero(heroes: string): void {
    if (!heroes) {
      // const isConfirmed = confirm('Hero must be required!');
      alert("Hero must be required!")
        return; }
    this.heroService.addHero({ heroes } as unknown as Hero).subscribe({
      next: (hero) => {
      this.messageService.add(`New hero is added.`);
       this.goBack();
      },
      error: (err) => {
        // Handle error
      },
      complete: () => this.goBack() // Or any other logic after completion
    });
  }
}
