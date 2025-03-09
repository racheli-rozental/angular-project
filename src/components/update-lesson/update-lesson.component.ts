import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../../service/lessons.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-lesson',
  imports:[ReactiveFormsModule],
  templateUrl: './update-lesson.component.html',
  styleUrl:'./update-lesson.component.css'
})
export class UpdateLessonComponent implements OnInit {
  lessonForm:FormGroup;
  lessonId!: any;
  courseId!:number
  lessonDetails: any = {};
  constructor(private fb: FormBuilder, private lessonService: LessonsService,private route: ActivatedRoute,
    private router: Router,) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      courseId:[this.courseId,Validators.required]
    });
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.courseId = +params['courseId'];
        this.lessonId = +params['lessonId'];
        this.lessonService.getLessonById(this.courseId,this.lessonId).subscribe(
          data => {
            this.lessonDetails = data;
            this.lessonForm.patchValue(this.lessonDetails); // עדכון הטופס עם פרטי השיעור
          console.log(this.lessonDetails)
          },
          error => {
            console.error('Error fetching lesson details', error);
          }
        );
      });
    }
    
  
  
    onUpdateLesson() {
      if (this.lessonForm.valid) {
        const updatedLesson = this.lessonForm.value; // קבלת הנתונים המעודכנים מהטופס
        this.lessonService.updateLesson(this.courseId, this.lessonId, updatedLesson).subscribe(
          response => {
            console.log('Lesson updated successfully', response);
            this.router.navigate(['/courses', this.courseId]); // מעבר לדף השיעורים
          },
          error => {
            console.error('Error updating lesson', error);
          }
        );
      } else {
        console.error('Form is invalid');
      }
    }
    
}
