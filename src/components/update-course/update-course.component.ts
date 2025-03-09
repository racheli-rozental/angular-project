// // import { Component } from '@angular/core';
// // import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// // import { AuthService } from '../../service/user.service';
// // import { ActivatedRoute, Router } from '@angular/router';

// // @Component({
// //   selector: 'app-update-course',
// //   imports: [ReactiveFormsModule],
// //   templateUrl: './update-course.component.html'
// // })
// // export class UpdateCourseComponent {
// //   updateForm: FormGroup;
// //   courseId: number;
// //   teacehrId!: string;

// //   constructor(
// //     private fb: FormBuilder,
// //     private courseService: AuthService,
// //     private route: ActivatedRoute,
// //     private router: Router
// //   ) {
// //     this.courseId = this.route.snapshot.params['id']; // קבלת ה-ID מה-URL
// //     this.teacehrId=sessionStorage.getItem('userId')||'';
// //     console.log(this.teacehrId)
// //     this.updateForm = this.fb.group({
// //       title: ['', Validators.required],
// //       description: ['', Validators.required],
      
// //       // teacherId: sessionStorage.getItem('userId'),
// //     });
// //   }

// //   onSubmit() {
// //     if (this.updateForm.valid) {
// //       const updates = this.updateForm.value;
// //       this.courseService.updateCourse(this.courseId, updates).subscribe(
// //         response => {
// //           console.log('Course updated successfully', response);
// //           this.router.navigate(['/courses']);
// //         },
// //         error => {
// //           console.error('Error updating course', error);
// //         }
// //       );
// //     }
// //   }
// // }
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from '../../service/user.service';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-update-course',
//   imports: [ReactiveFormsModule],
//   templateUrl: './update-course.component.html'
// })
// export class UpdateCourseComponent {
//   updateForm: FormGroup;
//   courseId: number;
//   teacherId!: string; // שגיאת כתיב תוקנה

//   constructor(
//     private fb: FormBuilder,
//     private courseService: AuthService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {
//     this.courseId = this.route.snapshot.params['id']; // קבלת ה-ID מה-URL
//     console.log( sessionStorage.getItem('userId'));
//     this.teacherId = sessionStorage.getItem('userId') || ''; // קבלת ה-userId מה-sessionStorage
//     console.log(this.teacherId);
    
//     this.updateForm = this.fb.group({
//       title: [],
//       description: [''],
//       teacherId: [this.teacherId, Validators.required], // הוספת teacherId לטופס
//     });
//   }

//   onSubmit() {
//     if (this.updateForm.valid) {
//       const updates = this.updateForm.value;
//       this.courseService.updateCourse(this.courseId, updates).subscribe(
//         response => {
//           console.log('Course updated successfully', response);
//           this.router.navigate(['/courses']);
//         },
//         error => {
//           console.error('Error updating course', error);
//         }
//       );
//     }
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-course',
  imports: [ReactiveFormsModule],
  templateUrl: './update-course.component.html',
  styleUrl:'./update-course.component.css'
})
export class UpdateCourseComponent {
  updateForm: FormGroup;
  courseId: number;
  teacherId!: string;

  constructor(
    private fb: FormBuilder,
    private courseService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courseId = this.route.snapshot.params['id'];
    this.teacherId = sessionStorage.getItem('userId') || '';

    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      teacherId: [this.teacherId, Validators.required],
    });
  }

  onCourseDataReceived(data: { title: string; description: string }) {
    this.updateForm.patchValue({
      title: data.title,
      description: data.description,
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const updates = this.updateForm.value;
      this.courseService.updateCourse(this.courseId, updates).subscribe(
        response => {
          console.log('Course updated successfully', response);
          this.router.navigate(['/courses']);
        },
        error => {
          console.error('Error updating course', error);
        }
      );
    }
  }
}

