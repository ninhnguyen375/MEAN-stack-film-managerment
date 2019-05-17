import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import Film from 'src/app/models/film.model';
import Manufacturer from 'src/app/models/manufacturer.model';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  manufacturers: Array<Manufacturer>;
  films: Array<Film>;
  isShowAddFilm = false;

  constructor(private data: DataService) {}

  toggleShowAddFilm(): void {
    this.isShowAddFilm = !this.isShowAddFilm;
  }

  setFilms(): void {
    this.data.getFilms().subscribe((res?: Array<Film>) => {
      this.films = res;
    });
  }

  setManufacturers(): void {
    this.data.getManufacturers().subscribe((res?: Array<Manufacturer>) => {
      this.manufacturers = res;
    });
  }

  ngOnInit() {
    this.setFilms();
    this.setManufacturers();
  }
}
