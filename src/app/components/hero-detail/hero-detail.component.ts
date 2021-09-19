import {Component, Input, OnInit,EventEmitter,Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {HeroesService} from "../../services/heroes.service";
import {IHero} from "../../../IHero";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?:IHero;
  @Output() onHeroDelete = new EventEmitter();
  constructor(
    private heroesService:HeroesService,
    private messageService:MessageService,
    private route :ActivatedRoute,
    private location :Location
  ) { }

  ngOnInit(): void {
    this.getHero()
  }
  getHero():void{
    const id = this.route.snapshot.paramMap.get("id") ||"1";
   this.heroesService.getHero(id).subscribe((hero)=>{
     this.hero = hero;
     this.messageService.add(`details for hero :${hero.name}`)

   })
  }
  saveHero(){
    if(this.hero)
      this.heroesService.updateHero(this.hero).subscribe((hero)=>{
        console.log("hero updated",hero);
        this.goBack();
    })
  }
  goBack(){
    this.location.back();
  }


}
