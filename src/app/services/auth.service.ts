import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from 'src/environment/environment.development';

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

  async agregarPelicula(item: any, tabla: string) {
    const docRef = await addDoc(collection(FIRESTORE_DB, tabla), {
      nombrePelicula: item.name,
      duracion: item.duration,
      horario: item.showtime,
      disponibilidad: item.availability,
      generos: item.genres,
    });
    console.log("Document written with ID: ", docRef.id);
  }
}
