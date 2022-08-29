import { Component, OnInit } from '@angular/core';

import { Chart } from 'node_modules/chart.js';

import { registerables } from 'chart.js';
import { ApiService } from 'src/app/Services/api.service';
import { HttpClient } from '@angular/common/http';



Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  chart: Chart;
  bar_data: any
  pie_data :any;




  constructor(private api: ApiService, private http: HttpClient) {

  }

  ngOnInit() {


    this.api.get_bar_chart().subscribe((Bar_chart_Data => {


      this.bar_data = Bar_chart_Data;

      var bar_label = Object.keys(this.bar_data);

      this.chart = new Chart('bar', {
        type: 'bar',

        data: {
          labels: bar_label,
          datasets: [
            {
              label: 'Employee Department Chart',
              data: Object.values(this.bar_data),
              backgroundColor: ['red', 'green', 'yellow', 'blue', 'pink']
            }
          ],

        },
        options: {
          scales: {
            xAxes: {
              title:{
              display: true,
              text:'Departments',
              
              },
            
            
              
            },
            
            
            yAxes: {
              title:{
              display: true,
              text:'Number of Employees',
              },
            
            
              
              
            },
          }
        }
      });




    }))





    this.api.get_pie_chart().subscribe((Pie_chart_Data => {

      this.pie_data = Pie_chart_Data;

      var pie_label = Object.keys(this.pie_data );
      console.log("%%" + Object.keys(this.pie_data ));
      console.log(Object.keys(Pie_chart_Data));


      this.chart = new Chart('pie', {
        type: 'pie',

        data: {
          labels: pie_label,
          datasets: [
            {
              label: 'Priamry Skill Chart',
              data: Object.values(this.pie_data ),
              backgroundColor: ['red', 'green', 'yellow', 'blue', 'pink']
            }
          ],

        },
        options: {
          scales: {
            x: {
              display: true
            },
            y: {
              display: true

            }
          }
        }
      });




    }))




  }
  update_bar() {

    this.http.get<any>("http://localhost:3000/employee_management/").subscribe((res) => {


      let bar_chart = new Map<string, number>();

      res.forEach(element => {
        switch (element.department) {
          case 'NodeJs':
            if (bar_chart.get(element.department) == null) {
              bar_chart.set(element.department, 1);
            } else {
              bar_chart.set(element.department, bar_chart.get(element.department) + 1)
            }
            break;

          case 'UI/UX':
            if (bar_chart.get(element.department) == null) {
              bar_chart.set(element.department, 1);
            } else {
              bar_chart.set(element.department, bar_chart.get(element.department) + 1)
            }
            break;

          case 'Machine Learning':
            if (bar_chart.get(element.department) == null) {
              bar_chart.set(element.department, 1);
            } else {
              bar_chart.set(element.department, bar_chart.get(element.department) + 1)
            }
            break;

          case 'Devops':
            if (bar_chart.get(element.department) == null) {
              bar_chart.set(element.department, 1);
            } else {
              bar_chart.set(element.department, bar_chart.get(element.department) + 1)
            }
            break;

          case 'Sales':
            if (bar_chart.get(element.department) == null) {
              bar_chart.set(element.department, 1);
            } else {
              bar_chart.set(element.department, bar_chart.get(element.department) + 1)
            }
            break;
        }





      })


      let bar_obj = {};
      bar_chart.forEach(function (value, key) {
        bar_obj[key] = value;
      });

      this.http.post("http://localhost:3000/Bar_chart_Data/", bar_obj).subscribe
        (res => {

        })


    })


  }
  update_pie() {


    this.http.get<any>("http://localhost:3000/employee_management/").subscribe((res) => {



      let pie_chart = new Map<string, number>();
      res.forEach(element => {
        switch (element.primary_skill) {
          case 'Angular':
            if (pie_chart.get(element.primary_skill) == null) {
              pie_chart.set(element.primary_skill, 1);
            } else {
              pie_chart.set(element.primary_skill, pie_chart.get(element.primary_skill) + 1)
            }
            break;

          case 'Python':
            if (pie_chart.get(element.primary_skill) == null) {
              pie_chart.set(element.primary_skill, 1);
            } else {
              pie_chart.set(element.primary_skill, pie_chart.get(element.primary_skill) + 1)
            }
            break;

          case 'CSS':
            if (pie_chart.get(element.primary_skill) == null) {
              pie_chart.set(element.primary_skill, 1);
            } else {
              pie_chart.set(element.primary_skill, pie_chart.get(element.primary_skill) + 1)
            }
            break;

          case 'NodeJs':
            if (pie_chart.get(element.primary_skill) == null) {
              pie_chart.set(element.primary_skill, 1);
            } else {
              pie_chart.set(element.primary_skill, pie_chart.get(element.primary_skill) + 1)
            }
            break;

          case 'HTML':
            if (pie_chart.get(element.primary_skill) == null) {
              pie_chart.set(element.primary_skill, 1);
            } else {
              pie_chart.set(element.primary_skill, pie_chart.get(element.primary_skill) + 1)
            }



        }





      })


      let pie_obj = {};
      pie_chart.forEach(function (value, key) {
        pie_obj[key] = value;
      });



      this.http.post("http://localhost:3000/Pie_chart_Data/", pie_obj).subscribe
        (res => {

        })


    })



  }

}




