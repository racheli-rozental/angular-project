import { Component, Input } from '@angular/core';
import { AuthService } from '../../service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  addCourseform!: FormGroup;
  course = {
    title: '',
    description: '',
  
  };
    constructor(private fb: FormBuilder,private userService:AuthService,private router:Router){}
     ngOnInit() {
        this.addCourseform = this.fb.group({
          title: '',
          description: '',
        });
      }
      
  
   
  
  addCourse(){
    const courseData = this.addCourseform.value;
    console.log('Course data:', courseData);
    this.userService.addCourse(courseData).subscribe(
      (response) => {
        console.log('Course added:', response);
        this.router.navigate(['/courses',response.courseId])
      },
      (error) => {
        console.error('Error adding course:', error);
      }
    );
  }
}
