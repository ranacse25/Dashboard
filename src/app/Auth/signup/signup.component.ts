import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupform!:FormGroup

  constructor(private formsBuilder:FormBuilder,
              private http:HttpClient,
              private tostr:ToastrService,
              private router:Router) { }

  ngOnInit(): void {


    this.signupform= this.formsBuilder.group({

      name :['',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      email_id:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3,4}$")]],
      password:['',Validators.required],
      created_datetime:null,
      updated_datetime:null,
     

     
    });
  }

  signUp()
  {
   
    console.log(new Date());
    console.log(this.signupform.value)

    var time = new Date();
    this.signupform.value.created_datetime = time;
    this.signupform.value.updated_datetime = time;
    console.log(this.signupform.value)


    this.http.get<any>("http://localhost:3000/users/")
    .subscribe(res=>{
      
      const user=res.find((a:any)=>{
      
        return a.email_id === this.signupform.value.email_id
        
      });

    
      
      if(user ){
       
        this.tostr.error("*This Email Already Exist")
       
        
      }
      else 
      {
        this.http.post<any>("http://localhost:3000/users/",this.signupform.value).
        subscribe(res=>{
         this.tostr.success("Signup Sucessfull");
         this.signupform.reset();
         this.router.navigate(['login'])
        }),err=>{
     
         this.tostr.warning("Something Wrong")
        }
      }
     
      
    },err=>{
      this.tostr.warning("Something went wrong");
    })

  
    
  }

}
