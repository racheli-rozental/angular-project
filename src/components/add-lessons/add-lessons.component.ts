import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LessonsService } from '../../service/lessons.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-lessons',
  imports: [ReactiveFormsModule],
  templateUrl: './add-lessons.component.html',
  styleUrl: './add-lessons.component.css'
})
export class AddLessonsComponent {
addLessonform!: FormGroup;
courseId!: number;
  course = {
    title: '',
    content: '',
  
  };
    constructor(private fb: FormBuilder,private lessonService:LessonsService,private route:ActivatedRoute,private router:Router){}
     ngOnInit() {
        this.addLessonform = this.fb.group({
          title: '',
          content: '',
        });
        this.route.params.subscribe(params => {
          this.courseId = +params['id']; 
        });
      }
      
  
   
  
  addCourse(){
    const courseData = this.addLessonform.value;
    console.log('Course data:', courseData);
    this.lessonService.addLesson(courseData,this.courseId).subscribe(
      (response) => {
        console.log('Course added:', response);
        this.router.navigate(['/course-details',this.courseId])
      },
      (error) => {
        console.error('Error adding course:', error);
      }
    );
  }
}
