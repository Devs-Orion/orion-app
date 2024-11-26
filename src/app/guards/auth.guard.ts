import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Inyectar AuthService
  const router = inject(Router);  // Inyectar Router para hacer redirección

  // Verifica si el usuario está logueado
  if (authService.isLoggedIn) {
    return true;  // Si está logueado, permite el acceso
  } else {
    // Si no está logueado, redirige al login
    router.navigate(['/login']);
    return false;
  }
};
