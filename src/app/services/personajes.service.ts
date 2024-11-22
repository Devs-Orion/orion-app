import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personajes } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  constructor(private http: HttpClient) { }

  getDatos() { //Función para obtener los datos de la API.
    return this.http.get('https://orion-bd-default-rtdb.firebaseio.com/.json');
  }

  getDetalle(id: number) { //Función para obtener los detalles de un personaje desde la API.
    //Esta función recibe como parámetro el id, que representa el número del arreglo del archivo JSON.
    return this.http.get<Personajes>(`https://orion-bd-default-rtdb.firebaseio.com/${id}.json`); //Accedemos a la url del personaje.
  }
}
