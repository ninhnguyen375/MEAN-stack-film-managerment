import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmItemComponent } from './components/film-item/film-item.component';
import { HttpClientModule } from '@angular/common/http';
import { AddFilmComponent } from './components/add-film/add-film.component';
import { EditFilmComponent } from './components/edit-film/edit-film.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilmListComponent,
    FilmItemComponent,
    AddFilmComponent,
    EditFilmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
