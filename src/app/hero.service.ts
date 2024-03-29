import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, catchError, of, retry, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService:MessageService,
    private http: HttpClient,
  
    ) { }

    /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'http://localhost:8080/';  // URL to web api

  getHeroes():Observable<Hero[]>{
    // const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl + "heroesdata");
  }

 /** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl + "hero/data"}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`))
  );
}


/** PUT: update the hero on the server */
updateHero(id:number,updateHero: Hero): Observable<any> {
  return this.http.put<Hero>(this.heroesUrl+'hero/data/'+id,updateHero);
}

// add the hero 
addHero(addHereRequest:Hero):Observable<Hero[]>{
  return this.http.post<Hero[]>(this.heroesUrl + 'hero/data/',addHereRequest);
}


// to delte the hero 
deleteBus(id:number):Observable<Hero>
  {
    return this.http.delete<Hero>(this.heroesUrl+'hero/data/'+id);
  }
}
