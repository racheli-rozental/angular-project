import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl:'./login.component.css'
})
export class LoginComponent implements OnInit {
  @Output() userId = new EventEmitter<number>();
  loginForm!: FormGroup;
  alertMessage: string = '';
  alertType: string = 'error'; // אפשר 'success', 'info', או 'warning'
  
  
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  showAlert(message: string, type: string): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = ''; // מחיקת ההודעה אחרי 5 שניות
    }, 5000);
  }
  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        response => {
          console.log('Login successful', response);
          this.authService.saveToken(response.token);
          this.authService.saveUserId(response.userId);
          this.authService.setUserRole(response.role); // עדכון תפקיד המשתמש
          this.router.navigate(['/courses']); 
        },
        error => {
          console.error('Login failed', error);
          this.showAlert('אינך רשום במערכת','faild');

         
        }
      );
    }
}

  
}