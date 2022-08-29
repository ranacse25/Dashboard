import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatMenuItem } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/guards/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private auth:AuthService) {}
   
  
  ngOnInit(): void {

  
}

logout()
{
  this.auth.logout();
}



  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }


}
