import { Component, Input } from '@angular/core';
import {NgIf, UpperCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Hero} from '../hero';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  standalone: true,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  imports: [FormsModule, NgIf, UpperCasePipe],
})
export class HeroDetailComponent {
background: any;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private router: Router,
    private messageService:MessageService
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

  update():void{
    const isConfirmed = confirm('Are you sure you want to update this hero?');
    if(isConfirmed){
   if(this.hero?.id){
    this.heroService.updateHero(this.hero.id,this.hero).subscribe({
      next:() =>{
        this.messageService.add(`Selected id updated`);
        this.goBack();
      },
      error: (err) => {
        console.error('Error updating bus details', err);
      }
    });
   }
  }
  }

  delete(id:number){
  const isConfirmed = confirm('Are you sure you want to delete this hero?');
  if(isConfirmed){
   this.heroService.deleteBus(id).subscribe({
    next:(response)=>
      {
        this.messageService.add(`${id} id is deleted.`);
        this.goBack()
      },
   })
  }
  }

}
