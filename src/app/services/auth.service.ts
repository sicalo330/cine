import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any = null;

  constructor(private afAuth: AngularFireAuth) {
    // Mantener la sesión del usuario
    this.afAuth.authState.subscribe(user => {
      this.userData = user;
    });
  }

  // Método para iniciar sesión con correo y contraseña
  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método para registrarse con correo y contraseña
  register(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Método para cerrar sesión
  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  // Método para obtener el usuario actual
  getUser(): User | null {
    return this.userData;
  }
}
