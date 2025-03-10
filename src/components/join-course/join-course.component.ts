import { Component } from '@angular/core';
import { RegistrationService } from '../../service/registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-join-course',
  imports: [],
  templateUrl: './join-course.component.html',
  styleUrl: './join-course.component.css'
})
export class JoinCourseComponent {
  userId=sessionStorage.getItem('userId')||'';
  courseId!:string
  constructor(private registrationService: RegistrationService,private route: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId')||'';
  
  }
  onRegister(courseId: string, userId: string) {
    this.registrationService.enroll(courseId, userId).subscribe(
      response => {
        console.log('Registration successful', response);
        Swal.fire({
          title: 'נרשמת בהצלחה!',
          icon: 'success',
          confirmButtonText: 'אוקי'
        });
        this.router.navigate(['/courses'])
      },
      error => {
        Swal.fire({
          title: 'שגיאה!',
          text: 'נראה שמשהו השתבש.',
          icon: 'error',
          confirmButtonText: 'אוקי'
        });
        this.router.navigate(['/courses'])
      }
    );
  }
}

