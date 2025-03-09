import { Component } from '@angular/core';
import { AuthService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-course',
  imports: [],
  templateUrl: './delete-course.component.html',
  styleUrl: './delete-course.component.css'
})
export class DeleteCourseComponent {
  courseId!: number;



  constructor(private userService:AuthService,private route: ActivatedRoute,private router:Router) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = +params['id']; // קבל את ה-ID מהפרמטרים של ה-URL
    });
  }
  deleteCourse() {
    this.userService.deleteCourse(this.courseId).subscribe(
      response => {
        console.log('Course deleted successfully', response);
      },
      error => {
        console.error('Error deleting course', error);
      }
    );
    this.router.navigate(['/courses']);
  }
  onCancel():void{
    this.router.navigate(['/courses']);
  }
}
