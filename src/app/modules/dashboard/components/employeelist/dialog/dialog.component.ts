import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

 
  employeeForm!: FormGroup;
  actionBtn: string ="Add Employee";
  EmpName:any
  count=0;

  constructor(private formsBuilder:FormBuilder, 
    private api:ApiService, 
    @Inject(MAT_DIALOG_DATA )public editData:any,
    private toster: ToastrService ,
    private dialogRef: MatDialogRef<DialogComponent>) 
  { }

  ngOnInit(): void {

    this.employeeForm= this.formsBuilder.group({

      first_name :['',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      last_name :['',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      email_id:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3,4}$")]],
      gender:['',Validators.required],
      date_of_joining:['',[Validators.required],],
      reporting_manager:['',[Validators.required]],
      department:['',[Validators.required]],
      status:['',[Validators.required]],
      primary_skill:['',[Validators.required]],
      date_of_birth:['',[Validators.required]],
      country_code:['',[Validators.required]],
      contact:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]

     
    });

   

    if(this.editData)
    {
      this.actionBtn="Update "

      this.employeeForm.controls['first_name'].setValue(this.editData.first_name);
      this.employeeForm.controls['last_name'].setValue(this.editData.last_name);
      this.employeeForm.controls['email_id'].setValue(this.editData.email_id);
      this.employeeForm.controls['gender'].setValue(this.editData.gender);
      this.employeeForm.controls['date_of_joining'].setValue(this.editData.date_of_joining);
      this.employeeForm.controls['reporting_manager'].setValue(this.editData.reporting_manager);
      this.employeeForm.controls['department'].setValue(this.editData.department);
      this.employeeForm.controls['status'].setValue(this.editData.status);
      this.employeeForm.controls['primary_skill'].setValue(this.editData.primary_skill);
      this.employeeForm.controls['date_of_birth'].setValue(this.editData.date_of_birth);
      this.employeeForm.controls['contact'].setValue(this.editData.contact);
      this.employeeForm.controls['country_code'].setValue(this.editData.country_code);
      
                      
    }

    
        
  }
  addEmployee()
  {

    if(!this.editData)
    {
      if(this.employeeForm)
    {
      this.api.postEmployee(this.employeeForm.value)
      .subscribe({
        next:(res)=>
        {
             console.log(res)
            this.toster.success('Employee Added Sucessfully');

          

            this.dialogRef.close('save');
            
        },
        error:()=>
        {
          alert("Error while adding the product");
        }
      })

    } 
    }else{

      this.updateEmployee()
    }
  }
  updateEmployee()
  {
    this.api.putEmployee(this.employeeForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        this.toster.success('Employee Details Update Sucessfully');
        this.employeeForm.reset();
        this.dialogRef.close('update');

      
      },
      error:()=>
      {
        alert("error while updating the Record");
      }
    })
  }

 


}
