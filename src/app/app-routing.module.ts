import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardGuard } from './guards/guard.guard';
import { LoginComponent } from './Auth/login/login.component';
import { PageNotFoundComponent } from './Auth/page-not-found/page-not-found.component';
import { SignupComponent } from './Auth/signup/signup.component';

const routes: Routes = [

  
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'/login', pathMatch:'full'},
  {path:'signup',component:SignupComponent},

  {path:'home',
  canActivate:[GuardGuard],
  loadChildren:()=>import('./modules/dashboard/dashboard.module').then((m)=>m.DashboardModule)},

  {path:'**',component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
