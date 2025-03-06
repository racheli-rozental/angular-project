import { Component, NgModule } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from '../components/register/register.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "../components/login/login.component";
import { CoursesComponent } from "../components/home/home.component";
import { AppRoutingModule, routes } from './app.routes';


import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [HttpClientModule, RegisterComponent, CommonModule, RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'angular-project';
  teacherId!: number;

  onUserIdReceived(id: number) {
    this.teacherId = id;
  }

 
}
