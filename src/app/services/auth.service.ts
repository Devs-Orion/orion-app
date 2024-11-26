import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Guarda los datos del usuario logueado

  constructor(
    private afAuth: AngularFireAuth, // Servicio de autenticación de Firebase
    private firestore: AngularFirestore,
    private router: Router // Servicio de enrutamiento de Angular
  ) {
    // Monitorear el estado de autenticación del usuario
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // Guarda los datos básicos del usuario en `user`
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData)); 
        console.log('Datos básicos del usuario: ', this.userData);
  
        // Intenta obtener datos adicionales del usuario desde Firestore
        this.loadUserStats(user.uid);
      } else {
        // Limpiar datos si no hay usuario logueado
        localStorage.removeItem('user');
        localStorage.removeItem('userStats');
      }
    });
  }

// Método para cargar los datos adicionales del usuario desde Firestore
private async loadUserStats(uid: string): Promise<void> {
    try {
      const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
  
      if (userDoc && userDoc.exists) {
        const userStats = userDoc.data();
        localStorage.setItem('userStats', JSON.stringify(userStats));
        console.log('Datos adicionales del usuario cargados: ', userStats);
      } else {
        console.warn('El documento del usuario no existe en Firestore.');
      }
    } catch (error) {
      console.error('Error al cargar los datos adicionales del usuario desde Firestore: ', error);
    }
  }
  

// Método para iniciar sesión con correo y contraseña
async signIn(email: string, password: string): Promise<void> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
  
      // Verifica que `result.user` no sea null antes de proceder
      if (result.user) {
        // Actualiza los datos del usuario en Firestore
        await this.updateUserData(result.user);
  
        // Carga los datos adicionales del usuario desde Firestore
        await this.loadUserStats(result.user.uid);
  
        // También guarda los datos básicos del usuario de Firebase
        this.userData = result.user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        console.log('Inicio de sesión exitoso. Datos básicos y adicionales cargados.');
      } else {
        throw new Error('No se pudo obtener el usuario después de iniciar sesión.');
      }
    } catch (error) {
      console.error('Error en signIn: ', error);
      throw error; // Propaga el error para que el componente lo maneje
    }
  }
  

  async updateUserData(user: any) { 
    const userRef = this.firestore.collection('users').doc(user.uid); 
    const data = { 
        email: user.email, 
        displayName: user.displayName || 'Usuario', 
        lvl_1_best_score: 0, 
        lvl_1_best_time: 0, 
        lvl_2_best_score: 0, 
        lvl_2_best_time: 0, 
        lvl_3_best_score: 0, 
        lvl_3_best_time: 0, 
        hemetita: 0 // hemetita (int) 
        }; // Usamos { merge: true } para combinar los datos sin sobrescribir los existentes (Solo actualiza si no existen) 
        return userRef.set(data, { merge: true }); 
    }

    // Método para actualizar el displayName del usuario
    async updateDisplayName(newDisplayName: string): Promise<void> {
        try {
        const user = await this.afAuth.currentUser;
    
        if (user) {
            // Actualiza el displayName en Firebase Authentication
            await user.updateProfile({ displayName: newDisplayName });
            console.log('DisplayName actualizado en Firebase Auth:', newDisplayName);
    
            // Actualiza el displayName en Firestore
            const userRef = this.firestore.collection('users').doc(user.uid);
            await userRef.set({ displayName: newDisplayName }, { merge: true });
            console.log('DisplayName actualizado en Firestore:', newDisplayName);
    
            // Actualiza el localStorage
            this.userData = { ...this.userData, displayName: newDisplayName };
            localStorage.setItem('user', JSON.stringify(this.userData));
        } else {
            throw new Error('No se encontró ningún usuario autenticado.');
        }
        } catch (error) {
        console.error('Error al actualizar el displayName:', error);
        throw error;
        }
    }  

  // Método para cerrar sesión
  async signOut(): Promise<void> {
    await this.afAuth.signOut(); // Cerrar sesión en Firebase
    localStorage.removeItem('user'); // Limpiar localStorage
    this.router.navigate(['login']); // Redirigir al login
  }

  // Getter para comprobar si el usuario está logueado
  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user'); // Comprobar si hay datos del usuario en localStorage
    return user !== null; // Devolver true si existe, false en caso contrario
  }
}
