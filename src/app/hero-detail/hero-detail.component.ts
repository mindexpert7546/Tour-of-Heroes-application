import { Component, Input } from '@angular/core';
import {NgIf, UpperCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Hero} from '../hero';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';


@Component({
  standalone: true,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  imports: [FormsModule, NgIf, UpperCasePipe],
})
export class HeroDetailComponent {

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private router: Router
  ){}
  @Input() hero?: Hero;

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save():void{
   if(this.hero?.id){
    this.heroService.updateHero(this.hero.id,this.hero).subscribe({
      next:() =>{
        this.goBack();
      },
      error: (err) => {
        console.error('Error updating bus details', err);
      }
    });
   }
  }

  delete(id:number){
   this.heroService.deleteBus(id).subscribe({
    next:(response)=>
      {
        // this.getBusList();
        this.goBack()
      },
   })
  }

}
