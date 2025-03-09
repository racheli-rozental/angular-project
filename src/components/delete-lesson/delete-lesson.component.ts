import { Component } from '@angular/core';
import { LessonsService } from '../../service/lessons.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-lesson',
  templateUrl: './delete-lesson.component.html',
  styleUrls: ['./delete-lesson.component.css']
})
export class DeleteLessonComponent {
  courseId!: number;
  lessonId!: number;
  userRole=sessionStorage.getItem('role');
  constructor(
    private lessonsService: LessonsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = +params['courseId']; // קבל את ה-ID של הקורס
      this.lessonId = +params['lessonId']; // קבל את ה-ID של השיעור
    });
  }



  deleteLesson(): void {
    this.lessonsService.deleteLesson(this.courseId, this.lessonId).subscribe(() => {
      // לאחר המחיקה, ניתן לנווט לדף הקורס או לדף אחר
      this.router.navigate(['/courses',this.courseId]); // כאן אתה יכול לשנות לנתיב הרצוי
    }, error => {
      console.error('Error deleting lesson:', error);
      // טיפול בשגיאות אם יש צורך
    });
  }



  onCancel(): void {
    this.router.navigate(['/courses',this.courseId]); // נווט חזרה לדף הקורס
  }
}
