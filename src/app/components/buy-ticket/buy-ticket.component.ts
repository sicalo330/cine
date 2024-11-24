import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {
  quantity:number = 0
  movie:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthService){}

  ngOnInit(): void {
    this.movie = this.data.movieData
  }

  addQuantity(){
    this.quantity += 1
  }

  downQuantity(){
    if(this.quantity == 0){
      return  
    }
    this.quantity -= 1
  }

  buyTicket(){
    if(this.quantity <= 0){
      alert("Debe comprar al menos un tiquete")
      return
    }
    console.log(this.movie.id)
    let newAvailability = this.movie.availability - this.quantity
    this.auth.updateMovie(this.movie.id,{availability:newAvailability},'movie').then(() => {
      console.log("creo que sí")
    }).catch((error) => {
      alert(error)
    })
  }
}
