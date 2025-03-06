// // register.component.ts
// import { Component } from '@angular/core';
// import { UserService } from '../../service/user.service';
// import { FormsModule as formsModule } from '@angular/forms';

// @Component({
//   selector: 'app-register',
//   imports: [formsModule],
//   templateUrl: './register.component.html'
// })
// export class RegisterComponent {
//   user = {
//     name: '',
//     email: '',
//     password: '',
//     role: '' // או כל תפקיד אחר שתרצה
//   };

//   constructor(private userService: UserService) { }

//   register() {
//     this.userService.register(this.user).subscribe(
//       response => {
//         console.log('User registered successfully', response);
//       },
//       error => {
//         console.error('Error registering user', error);
//       }
//     );
//   }
// }
////////////////
// import { Component } from '@angular/core';

// import { UserService } from '../../service/user.service';
// import { FormsModule } from '@angular/forms';
// @Component({
//   selector: 'app-register',
//   imports:[FormsModule],
//   templateUrl: './register.component.html'
// })
// export class RegisterComponent {
//   name: string = '';
//   email: string = '';
//   password: string = '';
//   role: string = '';

//   constructor(private userService: UserService) {}

//   addUser() {
//     this.userService.addUser(this.name, this.email, this.password, this.role).subscribe(
//       response => {
//         console.log('User added successfully!', response);
//       },
//       error => {
//         console.error('Error adding user:', error);
//       }
//     );
//   }
// }

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
            this.router.navigate(['/courses']);
          },
          error: (err) => {
            console.error('Registration failed', err);
          }
        });
      }
    }
  }