import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';
import Manufacturer from 'src/app/models/manufacturer.model';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss'],
})
export class AddFilmComponent implements OnInit {
  constructor(private data: DataService) {}

  @Output() setFilms: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Input() manufacturers: Array<Manufacturer>;

  async handleAddFilm(data: any) {
    const addStatus = await this.data.addFilm(data);
    if (addStatus) {
      console.log('add success');
      this.setFilms.emit();
      this.cancel.emit();
    } else {
      console.log('add fail');
    }
  }

  async handleUploadImage(form: any) {
    await this.data.uploadImg(form.img.files[0]);
    this.setFilms.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
  ngOnInit() {}
}
