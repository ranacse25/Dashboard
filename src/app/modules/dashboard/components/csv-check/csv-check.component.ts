import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeelistComponent } from '../employeelist/employeelist.component';



export class CsvData {
  public first_name: any;
  public last_name: any;
  public email_id: any;
  public gender: any;
  public date_of_joining: any;
  public reporting_manager:any;
  public department: any;
  public status:any;
  public primary_skill: any;
  public date_of_birth: any;
  public country_code: any;
  public contact: any;
  public id: any;
}


@Component({
  selector: 'app-csv-check',
  templateUrl: './csv-check.component.html',
  styleUrls: ['./csv-check.component.scss']
})
export class CsvCheckComponent implements OnInit {

  constructor(private toastr:ToastrService,private http:HttpClient, private api:EmployeelistComponent )
  {
      
  }

  ngOnInit(): void {
    
  }
  name = 'Angular ' + VERSION.major;
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;


  uploadListener($event: any): void {

  
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      this.toastr.error("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CsvData = new CsvData();
        
        csvRecord.first_name = curruntRecord[0].trim();
        csvRecord.last_name = curruntRecord[1].trim();
        csvRecord.email_id = curruntRecord[2].trim();
        csvRecord.gender = curruntRecord[3].trim();
        csvRecord.date_of_joining = curruntRecord[4].trim();
        csvRecord.reporting_manager = curruntRecord[5].trim();
        csvRecord.department = curruntRecord[6].trim();
        csvRecord.status = curruntRecord[7].trim();
        csvRecord.primary_skill = curruntRecord[8].trim();
        csvRecord.date_of_birth = curruntRecord[9].trim();
        csvRecord.country_code = curruntRecord[10].trim();
        csvRecord.contact = curruntRecord[11].trim();
        csvRecord.id = curruntRecord[12].trim();
        csvArr.push(csvRecord);
      }
     
    }
    return csvArr;

    
  }
 


  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
   
    return headerArray;

  


  
  }
  

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
    
  }

  
    
  getJsonData(){

   
    var arr = JSON.parse(JSON.stringify(this.records[0]));
   

    this.http.post<any>("http://localhost:3000/employee_management/",arr)
     .subscribe(res=>{
      console.log("#"+res);
      this.api.getEmployee();

     })

     this.toastr.success("CSV upload Successfully")
    console.log(arr)


 

  
    

     
    
 
    
  }

  

}
