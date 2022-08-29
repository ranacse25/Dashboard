import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private router: Router, private http:HttpClient,private toastr:ToastrService) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login({ email_id, password }) 
  
  {
    
    this.http.get<any>("http://localhost:3000/users/")
    .subscribe(res=>{
      
      const user=res.find((a:any)=>{
      
        return a.email_id === email_id &&
         a.password === password
        
      });

      const person=res.find((a:any)=>{

        return a.email_id === email_id || a.password === password
      });
      
      if(user ){
       
 
        this.setToken('abcdefghijklmnopqrstuvwxyz');
        this.toastr.success("Login Success")
        this.router.navigate(['home/charts']);
      }
      else if(!user)
      {
          if(person)
          {
            this.toastr.error("email and password do not match !");
          }  
          else{
            this.toastr.error("User Not Found!");
          }
      }
     
      
    },
    err=>{
      this.toastr.error("500 Internal Server Error");
    })
   
     
         
        
     
   
    
  }
  
}
