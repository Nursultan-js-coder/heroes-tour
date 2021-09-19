import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import {FormsModule} from "@angular/forms";
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessageComponent } from './components/message/message.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessageComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
      HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
