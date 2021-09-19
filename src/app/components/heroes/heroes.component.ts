import { Component, OnInit } from '@angular/core';
import {IHero} from "../../../IHero";
import {heroes} from "../../../mock-heroes"
import {HeroesService} from "../../services/heroes.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes?:IHero[] = [];
  selectedHero?:IHero;
  newHero:IHero = {
    name:""
  };
  constructor(private heroesServices :HeroesService,private  messageService:MessageService) { }

  ngOnInit(): void {
    this.heroesServices.getHeroes().subscribe((hs)=>{
      this.heroes = hs;
    },
      (err)=>{
      console.log(err);
      throw new Error("err");
      },
      ()=>{
      console.log("completed")
      }
      )
  }
  addNewHero(){
    if(this.newHero) {
      this.newHero.id = this.nextId();
      this.heroesServices.addNewHero(this.newHero).subscribe((hero) => {
        this.heroes!.push(hero);
      })
    }
  }
  nextId(){
    if(this.heroes!.length)
    return this.heroes!.reduce((maxId,hero)=>Math.max(maxId,hero.id!),-1)+1;
    return 1;
  }
  deleteHero(hero:IHero){
    if(hero && this.heroes)
      this.heroesServices.deleteHero(hero).subscribe(()=>{
        this.heroes = this.heroes!.filter((h)=>h.id!==hero.id);
      })
  }
  searchHero(term:string){
    this.heroesServices.searchHeroes(term).subscribe((res)=>{
      console.log(res);
    })
    }
}
