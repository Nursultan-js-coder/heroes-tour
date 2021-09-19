import { Injectable } from '@angular/core';
import {IHero} from "../../IHero";
import {Observable,of} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  baseURL = "http://localhost:9000";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private messageService:MessageService,private http:HttpClient) { }
  getHeroes():Observable<IHero[]>{
    try {
      const response = this.http.get<IHero[]>(`${this.baseURL}/heroes`);
      this.messageService.add(`heroes are loaded`);
      return response;
    }
    catch(err) {
      throw new Error("error");
    }
  }
  getHero(id:string):Observable<IHero>{
    try {
      const response = this.http.get<IHero>(`${this.baseURL}/heroes/${id}`);
      return response;
    }
    catch(err){
      throw new Error("error")
    }

  }
  updateHero(hero:IHero){
    return this.http.put(`${this.baseURL}/heroes/${hero.id}`,hero,this.httpOptions);
  }
  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<IHero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<IHero[]>(`${this.baseURL}/heroes/?q=${term}`).pipe(
      tap(x => x.length ?
        this.messageService.add(`found heroes matching "${term}"`) :
        this.messageService.add(`no heroes matching "${term}"`)),
      catchError(this.handleError<IHero[]>('searchHeroes', []))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.messageService.add(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  addNewHero(hero:IHero):Observable<IHero>{
    return this.http.post<IHero>(`${this.baseURL}/heroes`,hero,this.httpOptions);
  }
  deleteHero(hero:IHero){
    return this.http.delete<IHero>(`${this.baseURL}/heroes/${hero.id}`,this.httpOptions);

  }



  }
