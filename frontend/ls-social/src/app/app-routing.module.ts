import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from "./landing/landing.component";
import {  SignInComponent} from "./sign-in/sign-in.component";
import {  SignUpComponent} from "./sign-up/sign-up.component";
import {  HomeComponent} from "./home/home.component";
const routes: Routes = [
  {path: "", redirectTo: "/landing",pathMatch: "full"},
  {path: 'landing', component: LandingComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path:'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
