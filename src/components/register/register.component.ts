import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/user.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',


})
export class RegisterComponent {
  registerForm: FormGroup;
   constructor( private fb: FormBuilder, private userService: AuthService, private router: Router ) 
   { this.registerForm = this.fb.group({
       name: ['', Validators.required], 
      email: ['', [Validators.required,Validators.email]], 
     password: ['', Validators.required],
     role:['student', Validators.required] });
    }
    onSubmit() {
      if (this.registerForm.valid) {
        const { name, email, password, role } = this.registerForm.value;
        this.userService.register( {name, email, password, role}).subscribe({
          next: (res) => {
            this.userService.saveToken(res.token);
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Registration failed', err);
          }
        });
      }
    }
  }