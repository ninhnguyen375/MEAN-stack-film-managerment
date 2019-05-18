import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Axios from 'axios';
import { NzMessageService } from 'ng-zorro-antd';
import moment from 'moment';

const baseAPI = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  host = 'http://localhost:3000/';

  constructor(
    private message: NzMessageService,
    private httpClient: HttpClient,
  ) {}

  createMessage(type: string, content?: string): void {
    this.message.create(type, content);
  }

  getFilms() {
    return this.httpClient.get(`${baseAPI}/films`);
  }

  getManufacturers() {
    return this.httpClient.get(`${baseAPI}/manufacturers`);
  }

  getDate(value?: string): string {
    return moment(value).format('YYYY-MM-DD');
  }

  async editFilm(data: any) {
    let flag = true;

    if (data && data.file && data.file.files[0]) {
      const uploadImg = await this.uploadImg(data.file.files[0]);
      if (!uploadImg) {
        return false;
      }
      await Axios.put(`${baseAPI}/films/${data.id}`, {
        name: data.name,
        director: data.director,
        manufacturer: data.manufacturer,
        start_record: this.getDate(data.start_record),
        premiere_date: this.getDate(data.premiere_date),
        img: data.file.files[0].name,
      }).catch(err => {
        this.createMessage('error', err.response.data);
        flag = false;
      });
      return flag;
    } else {
      await Axios.put(`${baseAPI}/films/${data.id}`, {
        name: data.name,
        director: data.director,
        manufacturer: data.manufacturer,
        start_record: this.getDate(data.start_record),
        premiere_date: this.getDate(data.premiere_date),
      }).catch(err => {
        this.createMessage('error', err.response.data);
        flag = false;
      });
      return flag;
    }
  }

  async addFilm(data: any) {
    let flag = true;

    if (!data.file || !data.file.files[0]) {
      this.createMessage('error', 'Please Input Image!');
      return false;
    }

    const uploadImg = await this.uploadImg(data.file.files[0]);
    if (!uploadImg) {
      this.createMessage('error', 'Upload Image Fail!');
      return false;
    }

    await Axios.post(`${baseAPI}/films`, {
      name: data.name,
      director: data.director,
      manufacturer: data.manufacturer,
      start_record: data.start_record,
      premiere_date: data.premiere_date,
      img: data.file.files[0].name,
    }).catch(err => {
      this.createMessage('error', err.response.data);
      flag = false;
    });
    return flag;
  }

  async uploadImg(img: any) {
    const data = new FormData();
    data.append('img', img);

    try {
      await Axios.post(`${baseAPI}/films/upload/img`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  removeFilm(filmID) {
    return this.httpClient.delete(`${baseAPI}/films/${filmID}`, {
      responseType: 'text',
    });
  }
}
