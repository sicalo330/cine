import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  dataBill:any
  constructor(private auth:AuthService,private router:Router){}

  ngOnInit(): void {
    this.auth.getData('bill').subscribe((data) => {
      this.dataBill = data
    })
  }
  
  back(){
    this.router.navigate(['home'])
  }

}
