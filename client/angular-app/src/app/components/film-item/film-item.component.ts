import { Component, Input, Output, EventEmitter } from '@angular/core';
import Film from '../../models/film.model';
import { DataService } from 'src/app/data.service';
import Manufacturer from 'src/app/models/manufacturer.model';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss'],
})
export class FilmItemComponent {
  isShowEditFilm = false;
  host: string;

  constructor(private data: DataService, private modalService: NzModalService) {
    this.host = data.host;
  }

  @Input() film: Film;
  @Input() manufacturers: Array<Manufacturer>;
  @Output() setFilms: EventEmitter<any> = new EventEmitter();

  onSetFilms(): void {
    this.setFilms.emit();
  }

  showDeleteConfirm(filmID: any): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this film?',
      nzContent: '<b style="color: red;">It will be permanently deleted!</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.handleRemoveFilm(filmID);
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  getManufacturerName(manufacturers, id): string {
    return manufacturers.find(item => item._id === id).name;
  }

  handleRemoveFilm(filmID: any): void {
    this.data.removeFilm(filmID).subscribe(
      res => {
        this.data.createMessage('success', 'Success!');
      },
      error => {
        this.data.createMessage('error', error);
      },
      () => {
        this.setFilms.emit();
      },
    );
  }

  toggleShowEditFilm(): void {
    this.isShowEditFilm = !this.isShowEditFilm;
  }
}
