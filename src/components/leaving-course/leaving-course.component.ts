import { Component } from '@angular/core';
import { RegistrationService } from '../../service/registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leaving-course',
  imports: [],
  templateUrl: './leaving-course.component.html',
  styleUrl: './leaving-course.component.css'
})
export class LeavingCourseComponent {
 userId=sessionStorage.getItem('userId')||'';
  courseId!:string
  constructor(private courseService: RegistrationService,private route: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId')||'';
  
  }
  leaveCourse() {
    this.courseService.leaveCourse(this.courseId,this.userId)
      .subscribe({
        next: (response) => {
          console.log('עזיבת הקורס הצליחה', response);
           Swal.fire({
                    title: '!הודעה',
                    text: '.עזבת את הקורס בהצלחה',
                    icon: 'success',
                    confirmButtonText: 'אוקי'
                  });
                  this.router.navigate(['/courses'])
        },
        error: (error) => {
          Swal.fire({
            title: '!שגיאה ',
            text: 'עזיבת הקורס נכשלה',
            icon: 'error',
            confirmButtonText: 'אוקי'
          });
          this.router.navigate(['/courses'])
        }
      });
  }

}
