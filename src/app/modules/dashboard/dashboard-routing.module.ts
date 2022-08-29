import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './components/charts/charts.component';
import { EmployeelistComponent } from './components/employeelist/employeelist.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ViewEmployeeListComponent } from './components/view-employee-list/view-employee-list.component';

const routes: Routes = [

  {path:'',component:HomeComponent,children:[

    
    {path:'sidenav',component:SidenavComponent},
    {path:'header',component:HeaderComponent},
    {path:'charts', component:ChartsComponent},
    {path:'employeelist',component:EmployeelistComponent},
    {path:'view',component:ViewEmployeeListComponent}
   
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
