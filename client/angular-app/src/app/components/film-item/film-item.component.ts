import { Component, Input, Output, EventEmitter } from '@angular/core';
import Film from '../../models/film.model';
import { DataService } from 'src/app/data.service';
import Manufacturer from 'src/app/models/manufacturer.model';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss'],
})
export class FilmItemComponent {
  isShowEditFilm = false;
  host: string;

  constructor(private data: DataService) {
    this.host = data.host;
  }

  @Input() film: Film;
  @Input() manufacturers: Array<Manufacturer>;
  @Output() setFilms: EventEmitter<any> = new EventEmitter();

  onSetFilms(): void {
    this.setFilms.emit();
  }

  getManufacturerName(manufacturers, id): string {
    return manufacturers.find(item => item._id === id).name;
  }

  handleRemoveFilm(filmID): void {
    this.data.removeFilm(filmID).subscribe(
      res => console.log(res),
      error => console.log(error),
      () => {
        this.setFilms.emit();
      },
    );
  }

  toggleShowEditFilm(): void {
    this.isShowEditFilm = !this.isShowEditFilm;
  }
}
