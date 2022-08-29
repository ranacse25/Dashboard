import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/guards/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;
  responsedata;
  
  constructor(private tostr:ToastrService,
                private formBuilder:FormBuilder, 
               private http: HttpClient,
               private router:Router,
               private auth:AuthService
               
               ) { }

  ngOnInit(): void {
     if(this.auth.isLoggedIn()){
      this.router.navigate[('home')]
     }

    
    this.LoginForm = this.formBuilder.group({
  
      email_id:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3,4}$")]],
      password:['',[Validators.required,Validators.min(3)]],
     
    })
  }
   




  onsubmit()
  {
    if(this.LoginForm.valid)
    {
      this.auth.login(this.LoginForm.value)
    }

}
}
