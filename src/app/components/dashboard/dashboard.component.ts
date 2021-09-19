import { Component, OnInit } from '@angular/core';
import {HeroesService} from "../../services/heroes.service";
import {IHero} from "../../../IHero";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes:IHero[]= []
  constructor(private heroesService:HeroesService) { }
  ngOnInit(): void {
    this.getHeroes()
  }
  getHeroes():void{
    this.heroesService.getHeroes().subscribe((heroes)=>{
      this.heroes = heroes.slice(5);
    })
  }
}
