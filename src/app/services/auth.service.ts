import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any = null;

  constructor(private afAuth: AngularFireAuth,private firestore: AngularFirestore) {
    // Mantener la sesión del usuario
    this.afAuth.authState.subscribe(user => {
      this.userData = user;
    });
  }

  // Método para iniciar sesión con correo y contraseña
  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string, additionalData: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (userCredential) => {
        const uid = userCredential.user?.uid;
        if (uid) {
          // Guardar información adicional en Firestore
          return this.firestore.collection('users').doc(uid).set({
            email,
            ...additionalData, // Agrega los datos adicionales aquí
            createdAt: new Date(),
          });
        } else {
          throw new Error('No se pudo obtener el UID del usuario.');
        }
      }
    );
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
