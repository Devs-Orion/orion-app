import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  // Variable para almacenar los datos del usuario
  userData: any;
  userStats: any; // Estadísticas del usuario (Firestore)


  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth, // Servicio para obtener el estado del usuario
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // Suscribirse al estado de autenticación para obtener los datos del usuario
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user; // Asignar los datos del usuario
        this.userStats = JSON.parse(localStorage.getItem('userStats')!); // Obtener estadísticas del usuario

      } else {
        this.router.navigate(['/login']); // Redirigir si no hay sesión activa
      }
    });
  }

  cerrarSesion() {
    this.authService.signOut(); // Llama al método de cerrar sesión
    this.router.navigate(['/login']); // Redirige al login
  }

    // Función para editar el nombre de usuario
    async editarNombre() {
      const alert = await this.alertCtrl.create({
        header: 'Editar Nombre',
        cssClass: 'custom-dark-alert', // Clase CSS personalizada
        inputs: [
          {
            name: 'displayName',
            type: 'text',
            placeholder: 'Ingresa tu nuevo nombre',
            value: this.userStats?.displayName || this.userData?.displayName || '',
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Guardar',
            handler: async (data) => {
              if (data.displayName) {
                try {
                  await this.authService.updateDisplayName(data.displayName);
                  this.userStats.displayName = data.displayName; // Actualizar vista
                  console.log('Nombre actualizado exitosamente:', data.displayName);
                } catch (error) {
                  console.error('Error al actualizar el nombre:', error);
                }
              }
            },
          },
        ],
      });
      await alert.present();
    }
}
