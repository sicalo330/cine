import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  userData!: FormGroup;
  selectedHistory: string[] = [];
  selectedPreferences: string[] = [];

  historyOptions = ['Avatar', 'Avengers: Endgame', 'Titanic','The Cure for Insomnia','Pirates of the Caribbean'];
  preferencesOptions = ['Acción', 'Aventura', 'Ciencia ficción','Comedia','Drama','Fantasía','Musical','Misterio','Romance'];
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userData = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      history: [''],
      preferences: ['']
    });
  }

  onCheckboxChange(event: any, category: string) {
    const selectedOptions = category === 'history' ? this.selectedHistory : this.selectedPreferences;

    if (event.target.checked) {
      selectedOptions.push(event.target.value);
    } else {
      const index = selectedOptions.indexOf(event.target.value);
      if (index > -1) {
        selectedOptions.splice(index, 1);
      }
    }

    // Update form controls dynamically
    this.userData.get(category)?.setValue(selectedOptions);
  }

  register() {
    const data = {
      email: this.userData.get('email')!.value,
      password: this.userData.get('password')!.value,
      name: this.userData.get('name')!.value,
      history: this.userData.get('history')!.value,
      preferences: this.userData.get('preferences')!.value,
    };
  
    this.authService.register(data.email, data.password, {
        name:data.name,
        history: data.history,
        preferences: data.preferences,
      })
      .then(() => {
        this.router.navigate(['login']);
      })
      .catch((error) => {
        let mensaje
        switch (error.code) {
            case 'auth/weak-password':
                mensaje = "La contraseña debe tener al menos 6 caracteres";
                break;
            case 'auth/email-already-in-use':
                mensaje = "Ya existe una cuenta con este correo electrónico";
                break;
            case 'auth/invalid-email':
                mensaje = "El correo electrónico no es válido";
                break;
            default:
                mensaje = "Hubo un error al intentar crear la cuenta";
                // Agrega un caso para manejar errores desconocidos
                break;
        }
        alert(mensaje)
      });
  }

  backLogin(){
    this.router.navigate(['login'])
  }
  
}
