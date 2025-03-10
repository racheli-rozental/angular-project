import { Component } from '@angular/core';
import { RegistrationService } from '../../service/registration.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leaving-course',
  imports: [],
  templateUrl: './leaving-course.component.html',
  styleUrl: './leaving-course.component.css'
})
export class LeavingCourseComponent {
 userId=sessionStorage.getItem('userId')||'';
  courseId!:string
  constructor(private courseService: RegistrationService,private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId')||'';
  
  }
  leaveCourse() {
    this.courseService.leaveCourse(this.courseId,this.userId)
      .subscribe({
        next: (response) => {
          console.log('עזיבת הקורס הצליחה', response);
        },
        error: (error) => {
          console.error('שגיאה בעזיבת הקורס', error);
        }
      });
  }

}
