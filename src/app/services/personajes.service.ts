import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personajes } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  constructor(private http: HttpClient) { }

  getDatos() {
    return this.http.get('https://orion-bd-default-rtdb.firebaseio.com/.json');
  }

  getDetalle(id: number) {
    return this.http.get<Personajes>(`https://orion-bd-default-rtdb.firebaseio.com/${id}.json`);
  }
}
