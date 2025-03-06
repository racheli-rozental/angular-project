import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        
           response => {
            console.log('Login successful', response);
            this.authService.saveToken(response.token);
            console.log('token:', sessionStorage.getItem('token'));
            console.log('Navigating to courses...');
            this.router.navigate(['/courses']);
            console.log('Navigation command sent.');
          
        },
        error => {
          console.error('Login failed', error);
          alert('אינך רשום במערכת')
        }
      );
    }
  }
  onRegister() {
    this.router.navigate(['/register']);
  }
 
}

// response => {
//   console.log('Login successful', response);
//   this.authService.saveToken(response.token);
//   console.log('token:', sessionStorage.getItem('token'));
//   console.log('Navigating to courses...');
//   this.router.navigate(['/courses']);
//   console.log('Navigation command sent.');

// כאן תוכל לשמור את הטוקן או לבצע פעולות נוספות
