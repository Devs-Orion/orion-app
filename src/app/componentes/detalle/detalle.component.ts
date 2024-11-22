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
    private detalle: PersonajesService,
    private modalCtrl: ModalController
  ) { }

  regresar() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.detalle.getDetalle(this.id)
      .subscribe((respuesta: Personajes) => {
        console.log('Detalle Personaje:', respuesta);
        this.detallePersonaje = respuesta;
      });
  }

}
