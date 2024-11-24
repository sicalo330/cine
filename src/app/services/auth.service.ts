import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { collection, addDoc, doc,updateDoc,getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from 'src/environment/environment.development';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

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
  async login(email: string, password: string): Promise<any> {
    try {
      // Iniciar sesión con Firebase
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);

      // Obtener el token de acceso (ID Token)
      const token = await userCredential.user?.getIdToken();

      if (token) {
        // Guardar el token en localStorage
        localStorage.setItem('authToken', token);
      }

      // Retornar información del usuario (opcional)
      return userCredential.user;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
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
  logout(): void {
    this.afAuth.signOut();
    localStorage.removeItem('authToken');
  }

  // Método para obtener el usuario actual
  async getUserInfo(): Promise<firebase.User | null> {
    try {
      const currentUser = await this.afAuth.currentUser;
      return currentUser;
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
      return null;
    }
  }

  async getUser(userId: string | undefined) {
    if (!userId) {
      console.error('Error: userId no proporcionado.');
      return null;
    }
  
    try {
      const docRef = doc(FIRESTORE_DB,'users',userId)
      const docSnap = await getDoc(docRef)
      return docSnap.data()
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      throw error;
    }
  }

  async addMovie(item: any, table: string) {
    const docRef = await addDoc(collection(FIRESTORE_DB, table), {
      name: item.name,
      image: item.image,
      duration: item.duration,
      showTime: item.showtime,
      availability: item.availability,
      genres: item.genres,
      description:item.description
    });
  }

  getData(table: string): Observable<any[]> {
    return this.firestore.collection(table).valueChanges({ idField: 'id' });
  }

  async updateMovie(movieId: string, updatedData: any, table: string): Promise<void> {
    try {
        const sanitizedData = Object.fromEntries(
            Object.entries(updatedData).filter(([_, v]) => v !== undefined)
        ) as { [key: string]: any }; // <- Type assertion aquí

        // Referencia al documento que deseas actualizar
        const productoRef = doc(FIRESTORE_DB, table, movieId);

        // Actualizamos el documento con los datos pasados
        await updateDoc(productoRef, sanitizedData);
    } catch (error) {
        console.error('Error al actualizar la película:', error);
        throw error;
    }
  }

  async addBill(userId:string | undefined,name:string, quantity:number, duration:number, showtime:string, nameUser:string,emailUser:string){
    const docRef = await addDoc(collection(FIRESTORE_DB, 'bill'), {
      userId:userId,
      nameUser:nameUser,
      emailUser:emailUser,
      name_movie: name,
      quantity_ticket: quantity,
      duration_movie: duration,
      showTime_movie: showtime
    });
  }

  async getBill(userId: string | undefined) {
    if (!userId) {
      console.error('Error: userId no proporcionado.');
      return null;
    }
  
    try {
      const docRef = doc(FIRESTORE_DB,'bill',userId)
      const docSnap = await getDoc(docRef)
      return docSnap.data()
      
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      throw error;
    }
  }

}

