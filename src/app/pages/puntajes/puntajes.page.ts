import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.page.html',
  styleUrls: ['./puntajes.page.scss'],
})
export class PuntajesPage implements OnInit {
  // Variable para almacenar los datos del usuario
  userData: any;
  userStats: any; // Estadísticas del usuario (Firestore)


  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth, // Servicio para obtener el estado del usuario
    private router: Router
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

}
