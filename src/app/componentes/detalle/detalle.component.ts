import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Personajes } from 'src/app/interfaces/interfaces';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  //Input para recibir el id.
  @Input() id: any;
  detallePersonaje = {} as Personajes;

  constructor(
    private detalle: PersonajesService, //Variable que contiene el servicio de la API
    private modalCtrl: ModalController //Variable que contiene el controlador del Modal.
  ) { }

  regresar() { //Función para cerrar el modal.
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.detalle.getDetalle(this.id) //Obtenemos el detalle por su id.
      .subscribe((respuesta: Personajes) => { //Se recibe como parámetro la Interfaz Personajes.
        console.log('Detalle Personaje:', respuesta); //Imprimimos en consola el detalle del Personaje.
        this.detallePersonaje = respuesta; //Asignamos los datos de detalle personaje a la Interfaz.
      });
  }

}
