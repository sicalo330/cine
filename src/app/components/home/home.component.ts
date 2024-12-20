import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BuyTicketComponent } from '../buy-ticket/buy-ticket.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listMovie:any[] = []

  constructor(private router:Router, private auth:AuthService, public mat:MatDialog){}

  ngOnInit(): void {
    this.auth.getData('movie').subscribe((data) =>{
      this.listMovie = data
    })
  }

  createMovie(){
    this.router.navigate(['formularioPelicula']);
  }

  async logout(){
    await this.auth.logout()
    this.router.navigate(['login'])
  }

  openDialog(movieData:any){
    this.mat.open(BuyTicketComponent,{
      data:{movieData}
    });
  }

  goBill(){
    this.router.navigate(['bill'])
  }

}
