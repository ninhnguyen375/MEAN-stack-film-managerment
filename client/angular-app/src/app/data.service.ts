import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Axios from 'axios';

const baseAPI = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  host = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  getFilms() {
    return this.httpClient.get(`${baseAPI}/films`);
  }

  getManufacturers() {
    return this.httpClient.get(`${baseAPI}/manufacturers`);
  }

  async editFilm(data: any) {
    let flag = true;

    if (data.file.files[0]) {
      const uploadImg = await this.uploadImg(data.file.files[0]);
      if (!uploadImg) {
        return false;
      }
      await Axios.put(`${baseAPI}/films/${data.id.value}`, {
        name: data.name.value,
        director: data.director.value,
        manufacturer: data.manufacturer.value,
        start_record: data.start_record.value,
        premiere_date: data.premiere_date.value,
        img: data.file.files[0].name,
      }).catch(err => {
        alert(err.response.data);
        flag = false;
      });
      return flag;
    } else {
      await Axios.put(`${baseAPI}/films/${data.id.value}`, {
        name: data.name.value,
        director: data.director.value,
        manufacturer: data.manufacturer.value,
        start_record: data.start_record.value,
        premiere_date: data.premiere_date.value,
      }).catch(err => {
        alert(err.response.data);
        flag = false;
      });
      return flag;
    }
  }

  async addFilm(data: any) {
    let flag = true;

    if (!data.file || !data.file.files[0]) {
      return false;
    }

    const uploadImg = await this.uploadImg(data.file.files[0]);
    if (!uploadImg) {
      return false;
    }

    await Axios.post(`${baseAPI}/films`, {
      name: data.name.value,
      director: data.director.value,
      manufacturer: data.manufacturer.value,
      start_record: data.start_record.value,
      premiere_date: data.premiere_date.value,
      img: data.file.files[0].name,
    }).catch(err => {
      alert(err.response.data);
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
