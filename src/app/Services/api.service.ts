import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  error=null;

  constructor(private http: HttpClient, private toastr:ToastrService) { }

  postEmployee(data:any)
  {
    return this.http.post<any>("http://localhost:3000/employee_management/",data)
   
    
  }

  getEmployee()
  {
    return this.http.get<any>("http://localhost:3000/employee_management/")

    }


  get_bar_chart()
  {
    return this.http.get<any>("http://localhost:3000/Bar_chart_Data")
   
  }



  get_pie_chart()
  {
    return this.http.get<any>("http://localhost:3000/Pie_chart_Data")
   
  }

  putEmployee(data:any,id:number)
  {
    return this.http.put<any>("http://localhost:3000/employee_management/"+id,data)
   
  }

  deleteEmployee(id:number)
  {
    return this.http.delete<any>("http://localhost:3000/employee_management/"+id)
  
  }

  getView()
  {
    return this.http.get<any>("http://localhost:3000/employee_management/")
    
  }
  
 
  
}
