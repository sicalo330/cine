import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {
  quantity:number = 0
  movie:any
  userData:any[] = []
  userId:string | undefined = ''
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthService,public mat:MatDialog){}

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

  async buyTicket(){
    //Si la cantida que pidió el usuairo es 0
    if(this.quantity <= 0){
      alert("Debe comprar al menos un tiquete")
      return
    }

    //Si los cupos de la película es de 0
    if(this.movie.availability == 0){
      alert("Ya no quedan más cupos para esta pelicula")
      return
    }

    let newAvailability = this.movie.availability - this.quantity

    //Si la resta es menor o igual a 0
    if(newAvailability <= 0){
      alert("Ha excedido la cantidad de boletas que puede comprar")
      return
    }
    
    await this.auth.updateMovie(this.movie.id,{availability:newAvailability},'movie')
    .catch((error) => {
      alert(error)
    })
    

    //Con esto obtenemos la id del usuario
    await this.auth.getUserInfo().then((user) => {
      this.userId = user?.uid
    })

    await this.auth.getUser(this.userId).then((user) => {
      console.log(this.movie.name)
      console.log(this.quantity)
      console.log(this.movie.duration)
      console.log(this.movie.showTime)
      console.log(user?.['name'])
      console.log(user?.['email'])
      this.auth.addBill(this.userId,this.movie.name,this.quantity,this.movie.duration,this.movie.showTime,user?.['name'],user?.['email']).then(() => {
        this.mat.closeAll()
      }).catch((error) => {
        console.log(error)
        alert(error)
      })
    })
  }
}
