import { Component } from '@angular/core';
import { AuthService } from '../../service/user.service';

@Component({
  selector: 'app-add-course',
  imports: [],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  
    constructor(private userService:AuthService){}
  
   canAddCourse(){
    const role = sessionStorage.getItem('role');
    if( role != 'student'){
      return true;
    }
  }
  addCourse(){
    this.userService.addCourse().subscribe(
      (response) => {
        console.log('Course added:', response);
      },
      (error) => {
        console.error('Error adding course:', error);
      }
    );
  }
}
