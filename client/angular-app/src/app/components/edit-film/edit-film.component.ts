import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Film from 'src/app/models/film.model';
import { DataService } from 'src/app/data.service';
import Manufacturer from 'src/app/models/manufacturer.model';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss'],
})
export class EditFilmComponent implements OnInit {
  host: string;

  constructor(private data: DataService) {
    this.host = data.host;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() setFilms: EventEmitter<any> = new EventEmitter();
  @Input() film: Film;
  @Input() manufacturers: Array<Manufacturer>;

  onCancel(): void {
    this.cancel.emit();
  }

  async handleEditFilm(form: any) {
    const editStatus = await this.data.editFilm(form);
    if (editStatus) {
      console.log('edit success');
      this.setFilms.emit();
      this.cancel.emit();
    } else {
      console.log('edit fail');
    }
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

  ngOnInit() {}
}
