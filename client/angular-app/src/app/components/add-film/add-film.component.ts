import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';
import Manufacturer from 'src/app/models/manufacturer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss'],
})
export class AddFilmComponent implements OnInit {
  validateForm: FormGroup;
  isOkLoading = false;
  constructor(private data: DataService, private formBuilder: FormBuilder) {}

  @Output() setFilms: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Input() manufacturers: Array<Manufacturer>;
  @Input() isShowAddFilm: any;

  async handleAddFilm() {
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

    const addStatus = await this.data.addFilm({
      name: this.validateForm.get('name').value,
      director: this.validateForm.get('director').value,
      manufacturer: this.validateForm.get('manufacturer').value,
      start_record: this.validateForm.get('start_record').value,
      premiere_date: this.validateForm.get('premiere_date').value,
      file: window.document.getElementById('file'),
    });

    if (addStatus) {
      this.data.createMessage('success', 'Success');
      this.isOkLoading = false;
      this.cancel.emit();
      this.setFilms.emit();
    } else {
      this.isOkLoading = false;
    }
  }

  async handleUploadImage(form: any) {
    await this.data.uploadImg(form.img.files[0]);
    this.setFilms.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      name: [null, Validators.required],
      director: [null, Validators.required],
      manufacturer: [null, Validators.required],
      start_record: [null, Validators.required],
      premiere_date: [null, Validators.required],
      file: [],
    });
  }
}
