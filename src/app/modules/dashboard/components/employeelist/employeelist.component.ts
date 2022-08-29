import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { DialogComponent } from './dialog/dialog.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import { CsvCheckComponent } from '../csv-check/csv-check.component';
import { ViewEmployeeListComponent } from '../view-employee-list/view-employee-list.component';



@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {

  data;
  csvRecords:any=[];

  @ViewChild('content')content:ElementRef;

 
  displayedColumns: string[] = ['id','first_name', 'last_name','department', 'primary_skill','status','actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private dialog: MatDialog, private api:ApiService, private router:Router,
              private toastr:ToastrService )

  {
   
  }
   ngOnInit(): void {
     this.getEmployee();
   }

  openDialog()
  {
   
    
    this.dialog.open(DialogComponent,
      {
        width:'80%'
      }).afterClosed().subscribe(val=>
        {
          if(val==='save')
          {
            this.getEmployee();
          }
        })
  }

  getEmployee()
  {
    this.api.getEmployee()
    .subscribe({
      next:(res)=>
      {
        console.log("test!"+res);
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },

      error:(err)=>
      {
        alert("Error while fetching the Records");
      }
    })
  }

  editEmployee(row:any)

  {

   
    this.dialog.open(DialogComponent,{
      width:'80%',
      data:row

      
    }
    
    ) .afterClosed().subscribe(val=>
      {
        if(val==='update')
        {
          this.getEmployee();
        }
      })
  }

 

  viewEmployee(row:any){
   
    this.dialog.open(ViewEmployeeListComponent,{      
  
     data:row
      
    })

  
  }



  


  applyFilter(event:Event)
  {
    const filtervalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter =filtervalue.trim().toLowerCase();

    if(this.dataSource.paginator)
    {
       this.dataSource.paginator.firstPage();
    }
  }



  deleteEmployee(id:number) {
    Swal.fire({
      title: 'Are you sure ? you want to Delete',
      text: 'You will not be able to recover this Record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.api.deleteEmployee(id).subscribe({
          next:(res)=>
          {
            this.getEmployee();
          
          },
          error:()=>
          {
               alert("Error While Deleting the Employee");  
          }
        })
        this.toastr.success('Employee Deleted Sucessfully');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
       
      }
    });
  }

  makepdf()
  {
    let content=this.content.nativeElement;  
    let doc = new jsPDF();  
    let _elementHandlers =  
    {  
      '#editor':function(element,renderer){  
        return true;  
      }  
    };  
    doc.html(content.innerHTML,{  
  
      'width':190,  
       
    });  
  
    doc.save('test.pdf');  
    


  }

  opencsv()
  {
    this.dialog.open(CsvCheckComponent,{      
     
      width:'80'
  
     }).afterClosed().subscribe(val=>
      {
        
          this.getEmployee();
        
      })
  
 
  }



}
