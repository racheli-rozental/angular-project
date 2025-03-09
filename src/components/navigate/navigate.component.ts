// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-navigate',
//   imports: [],
//   templateUrl: './navigate.component.html',
//   styleUrl: './navigate.component.css'
// })
// export class NavigateComponent {
//   userRole!:string ;
//   constructor(private router:Router) {
//   this.userRole = sessionStorage.getItem('role')||'';
//   }
//   onRegister() {
//     this.router.navigate(['/register']);
//   }
//   onAddCourse(){
//     this.router.navigate(['/add-course']);
//   }
//   onLogin(){
//     this.router.navigate(['/']);
//   }
//   getCourses(){
//     this.router.navigate(['/courses']);
//   }
 
// }


import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/user.service';
import { MatToolbarModule } from '@angular/material/toolbar'
@Component({
  selector: 'app-navigate',
  imports:[MatToolbarModule,MatIconModule],
  templateUrl: './navigate.component.html',
  styleUrl:'./navigate.component.css'
})
export class NavigateComponent implements OnInit {
  userRole!: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onAddCourse() {
    this.router.navigate(['/add-course']);
  }

  onLogin() {
    this.router.navigate(['/']);
  }

  getCourses() {
    this.router.navigate(['/courses']);
  }
}


