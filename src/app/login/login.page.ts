import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';  // Importa el Router

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  passwordFieldType: string = 'password'; // Usamos passwordFieldType para controlar la visibilidad
  passwordToggleIcon: string = 'eye-off'; // Usamos passwordToggleIcon para el ícono

  // Inyecta el AuthService y Router
  constructor(
    public authService: AuthService,
    public toastController: ToastController,
    private router: Router  // Agrega Router al constructor
  ) {}

  ngOnInit() {
    // Redirige si hay una sesión activa
    if (this.authService.isLoggedIn) {  // Sin paréntesis
      this.router.navigate(['/inicio']);
    }
  }

  // Método para manejar el inicio de sesión
  async onSubmit() {
    if (!this.email || !this.password) {
      this.presentToast('Por favor, complete ambos campos.', 'danger');
      return;
    }

    try {
      await this.authService.signIn(this.email, this.password);
      this.presentToast('¡Inicio de sesión exitoso!', 'success');
      
      // Redirige a la página de inicio después del login exitoso
      this.router.navigate(['/inicio']);  // Usa router para redirigir

      // Limpiar campos de formulario
      this.email = '';
      this.password = '';
    } catch (error: any) {
      this.presentToast('Error al iniciar sesión: ' + error.message, 'danger');
    }
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() { 
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordToggleIcon = this.passwordToggleIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  // Método para mostrar un mensaje toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }
}
