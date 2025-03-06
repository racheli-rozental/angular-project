// courses.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];

  constructor(private courseService: AuthService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    console.log('Loading courses...');
    this.courseService.getCourses().subscribe(
      (data) => {
        console.log('data  loaded:', data);

        this.courses = data;
        console.log('Courses loaded:', this.courses);
      },

      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
}
