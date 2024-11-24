import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
userData!: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router:Router) {
    this.userData = this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  login(){
    const data: any = {
      email: this.userData.get('email')!.value,
      password: this.userData.get('password')!.value
    };

    this.authService.login(data.email, data.password)
    .then(() => {
      this.router.navigate(['home'])
    })
    .catch(err => {
      console.error(err);
      alert(err)
    });
  }

  formularioRegistro(){
    this.router.navigate(['register'])
  }

}
