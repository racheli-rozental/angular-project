import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { LessonsService } from '../../service/lessons.service';
import { DeleteLessonComponent } from "../delete-lesson/delete-lesson.component";
import { MatToolbarModule } from '@angular/material/toolbar'


@Component({
  selector: 'app-course-details',
  imports: [CommonModule,MatToolbarModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  courseDetails: any; 
  courselessons:any;
  userRole!:string ;
  courseId!: number;
  lessonId!:number
  
    constructor(private router:Router,private userService:AuthService,private route: ActivatedRoute,private lessonsService:LessonsService) {
      this.userRole = sessionStorage.getItem('role')||'';
    }
   
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.courseId = +params['id']; // קבל את ה-ID מהפרמטרים של ה-URL // ודא שהפרמטרים תואמים לשמות החדשים
        this.loadCourseDetails(this.courseId); // טען את פרטי הקורס
      });
    }
   
    loadCourseDetails(courseId: number) {
      console.log('Loading course details...');
      this.userService.getCourseDetails(courseId).subscribe(
        (data) => {
          this.courseDetails = data;
        },
        (error) => {
          console.error('Error fetching course details:', error);
        }
      );
   
    }
  onDelete():void{
    this.router.navigate(['/delete-course',this.courseId]);
  }
  getLessons():void{
    this.lessonsService.getLessons(this.courseId).subscribe(
      (data) => {
        console.log('Lessons loaded:', data);
        this.courselessons = data;
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
    
  }
  onAddLessons(){
    this.router.navigate(['/add-lessons',this.courseId]);
  }
  onLesson(lessonId: number,lesson: any) {
    this.lessonId = lessonId; // עדכן את lessonId
    this.router.navigate(['/lessons', this.courseId, this.lessonId],{ state: { lesson } });

    }
    


  onApdate(){
    this.router.navigate(['/update',this.courseId])
  }

}
