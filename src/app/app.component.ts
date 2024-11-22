import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
interface Elemento { //Interfaz que guarda los elementos del menú.
  icono: string;
  nombre: string;
  ruta: string;
}

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  elementos: Elemento[] = [ //Lista de los elementos del menú. El tipo de dato es la Interfaz previamente creada.
    {
      icono: 'person-circle-outline',
      nombre: 'Perfil',
      ruta: '/perfil'
    },
    {
      icono: 'ribbon-outline',
      nombre: 'Mis Puntajes',
      ruta: '/puntajes'
    }
  ];

  constructor() { }
}
