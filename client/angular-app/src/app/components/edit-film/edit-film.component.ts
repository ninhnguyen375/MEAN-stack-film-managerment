import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Film from 'src/app/models/film.model';
import { DataService } from 'src/app/data.service';
import Manufacturer from 'src/app/models/manufacturer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss'],
})
export class EditFilmComponent implements OnInit {
  validateForm: FormGroup;
  isOkLoading = false;
  host: string;

  constructor(private data: DataService, private formBuilder: FormBuilder) {
    this.host = data.host;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() setFilms: EventEmitter<any> = new EventEmitter();
  @Input() film: Film;
  @Input() manufacturers: Array<Manufacturer>;
  @Input() isShowEditFilm: any;

  onCancel(): void {
    this.isOkLoading = false;
    this.cancel.emit();
  }

  async handleEditFilm() {
    for (const i in this.validateForm.controls) {
      if (i) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.invalid) {
      return;
    }

    // Submit
    this.isOkLoading = true;

    const editStatus = await this.data.editFilm({
      id: this.film._id,
      name: this.validateForm.get('name').value,
      director: this.validateForm.get('director').value,
      manufacturer: this.validateForm.get('manufacturer').value,
      start_record: this.validateForm.get('start_record').value,
      premiere_date: this.validateForm.get('premiere_date').value,
      file: window.document.getElementById('file'),
    });

    if (editStatus) {
      this.data.createMessage('success', 'Success');
      this.isOkLoading = false;
      this.cancel.emit();
      this.setFilms.emit();
    } else {
      this.isOkLoading = false;
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

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      name: [this.film.name, Validators.required],
      director: [this.film.director, Validators.required],
      manufacturer: [this.film.manufacturer, Validators.required],
      start_record: [this.film.start_record, Validators.required],
      premiere_date: [this.film.premiere_date, Validators.required],
      file: [],
    });
  }
}
