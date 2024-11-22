import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from 'src/app/componentes/detalle/detalle.component';
import { Personajes } from 'src/app/interfaces/interfaces';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  personajes: Personajes[] = [];

  constructor(
    private servicioPersonajes: PersonajesService,
    private modalCtrl: ModalController
  ) { }

  //Función asíncrona que es ejecutada al dar clic sobre el card de un personaje.
  async verDetalle(id: number) { //Se recibe como parámetro el id (para más info. consulte personakes.service.ts).
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id }
    });
    //Visualizar el componente Detalle.
    modal.present();
  }

  ngOnInit() {
    this.servicioPersonajes.getDatos()//Se obtienen los datos.
      .subscribe((bd: any) => {
        this.personajes = bd; //Se asignan los datos obtenidos de los personajes a la variable bd.
        console.log(this.personajes); //Se imprimen en consola los datos.
      });
  }

}
