import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent {
  movieData!: FormGroup;
  selectedGenres: string[] = [];
  preferencesOptions = ['Acción','Aventura','Ciencia ficción','Comedia','Drama','Fantasía','Musical','Misterio','Romance'];

  constructor(private fb: FormBuilder,private auth:AuthService,private router:Router) {
    this.movieData = this.fb.group({
      name: ['', Validators.required], // Nombre de la película
      duration: ['', Validators.required], // Duración de la película
      showtime: ['', Validators.required], // Horario de función
      availability: ['', Validators.required], // Disponibilidad de entradas
      genres: [[]], // Géneros seleccionados (array)
    });
  }

  onCheckboxChange(event: any, category: string) {
    const selectedOptions = this.selectedGenres;

    if (event.target.checked) {
      selectedOptions.push(event.target.value);
    } else {
      const index = selectedOptions.indexOf(event.target.value);
      if (index > -1) {
        selectedOptions.splice(index, 1);
      }
    }

    // Actualizar los valores del formulario
    this.movieData.get('genres')?.setValue(selectedOptions);
  }

  submitForm() {
    if (this.movieData.valid) {
      const data: any = {
        name: this.movieData.get('name')!.value,
        duration: this.movieData.get('duration')!.value,
        showtime: this.movieData.get('showtime')!.value,
        availability: this.movieData.get('availability')!.value,
        genres: this.movieData.get('genres')!.value,
      };

      let dateString = data.showtime.toString().split(' ')
      const dateShowtime = dateString[1] + "/" + dateString[2] + "/" + dateString[3]

      data.showtime = dateShowtime

      this.auth.agregarPelicula(data,'pelicula').then(() => {
        this.router.navigate(['home'])
      }).catch((err) => {
        alert(err)
      })
    } else {
      alert("ALgún campo es incorrecto")
    }
  }
}
