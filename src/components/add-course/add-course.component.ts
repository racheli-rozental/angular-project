import { Component, Input } from '@angular/core';
import { AuthService } from '../../service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  imports: [],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  addCourseform!: FormGroup;
  @Input() teacherId!: number;
  course = {
    title: '',
    description: '',
    teacherId: 1, // או קח את ה-ID של המורה הנוכחי
  };
    constructor(private fb: FormBuilder,private userService:AuthService){}
     ngOnInit() {
        this.addCourseform = this.fb.group({
          title: '',
          description: '',
      
        });
      }
      
  
   canAddCourse(){
    const role = sessionStorage.getItem('role');
    if( role != 'student'){
      return true;
    }
  }
  addCourse(){
    if(!this.canAddCourse()){
      alert('אין לך הרשאה להוסיף קורס');
      return;
    }
    // this.userService.addCourse(this.course).subscribe(
    //   (response) => {
    //     console.log('Course added:', response);
    //   },
    //   (error) => {
    //     console.error('Error adding course:', error);
    //   }
    // );
  }
}
