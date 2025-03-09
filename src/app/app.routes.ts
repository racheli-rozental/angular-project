import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { AddCourseComponent } from '../components/add-course/add-course.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { DeleteCourseComponent } from '../components/delete-course/delete-course.component';
import { AddLessonsComponent } from '../components/add-lessons/add-lessons.component';
import { UpdateCourseComponent } from '../components/update-course/update-course.component';
import { DeleteLessonComponent } from '../components/delete-lesson/delete-lesson.component';
import { DetailsLessonComponent } from '../components/details-lesson/details-lesson.component';
import { UpdateLessonComponent } from '../components/update-lesson/update-lesson.component';

export const routes: Routes = [
    { path: 'courses', component: CoursesComponent },
    {path:'courses/:id',component:CourseDetailsComponent},
    {path:'register',component: RegisterComponent},
    { path: '', component: LoginComponent },
    {path:'add-course',component: AddCourseComponent},
    {path:'course-details/:id',component: CourseDetailsComponent},
    {path:'delete-course/:id',component: DeleteCourseComponent},
    {path:'add-lessons/:id',component: AddLessonsComponent},
    {path: 'update/:id',component:UpdateCourseComponent},
    {path:'lesson-delete/:courseId/:lessonId',component:DeleteLessonComponent},
    // {path:'lesson/:courseId/:lessonId',component:DeleteLessonComponent},
    { path: 'updateLesson/:courseId/:lessonId', component: UpdateLessonComponent },
    {path:'lessons/:courseId/:lessonId',component:DetailsLessonComponent},



    

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
