import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../../service/lessons.service';

@Component({
  selector: 'app-details-lesson',
  imports: [],
  templateUrl: './details-lesson.component.html',
  styleUrl: './details-lesson.component.css'
})
export class DetailsLessonComponent implements OnInit {
  lessonId!: number;
  lessonDetails!: any;
  courseId!: number;
  userRole!:string;
   constructor(private router:Router,private route: ActivatedRoute,private lessonsService:LessonsService) {
        this.userRole = sessionStorage.getItem('role')||'';
      }

  ngOnInit() {
    this.lessonDetails = history.state.lesson;
    this.route.params.subscribe(params => {
      this.courseId = +params['courseId'];}); 
  }
  onDeleteLesson(lessonId: number) {
    this.lessonId = lessonId; // עדכון ה-lessonId
    this.router.navigate(['/lesson-delete',  this.courseId,this.lessonId]); // קריאה לפונקציה למחוק שיעור
}
onUpdate(lessonId: number) {
  this.lessonId = lessonId;
  this.router.navigate(['/updateLesson', this.courseId, this.lessonId]).catch(error => {
    console.error('Navigation error', error);
  });
}


}
