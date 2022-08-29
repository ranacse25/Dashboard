import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/Services/api.service';


@Component({
  selector: 'app-view-employee-list',
  templateUrl: './view-employee-list.component.html',
  styleUrls: ['./view-employee-list.component.scss']
})
export class ViewEmployeeListComponent implements OnInit {

  selectedRow;
 
  constructor(private dialog: MatDialog, private api:ApiService,
    public dialogRef: MatDialogRef<ViewEmployeeListComponent>,
    @Inject (MAT_DIALOG_DATA) public data:any   )

  {
    this.selectedRow =data;
      }


   ngOnInit(): void {
     

   }


}
