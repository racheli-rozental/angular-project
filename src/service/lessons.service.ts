import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private http: HttpClient) { }
  apiUrlLessons="http://localhost:3000/api";
  getLessons(courseId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrlLessons}/courses/${courseId}/lessons`, { headers }).pipe(
      tap(data => console.log('Received lessons:', data)),
      catchError(error => {
        console.error('Error fetching lessons:', error);
        return throwError(error);
      })
    );
  }
  addLesson(lesson: { title: string; description: string; courseId: number },courseId: number): Observable<any> {
    console.log('Adding lesson:', lesson);
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrlLessons}/courses/${courseId}/lessons`, lesson, { headers });
  }
deleteLesson(courseId: number,lessonId:number): Observable<any> {
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  
  return this.http.delete(`${this.apiUrlLessons}/courses/${courseId}/lessons/${lessonId}`, { headers });
}
getLessonById(courseId:number,lessonId: number): Observable<any> {
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get(`${this.apiUrlLessons}/courses/${courseId}/lessons/${lessonId}`, { headers });
}


// עדכון שיעור
updateLesson(courseId:number,lessonId: number, updatedLesson: any): Observable<any> {
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.put(`${this.apiUrlLessons}/courses/${courseId}/lessons/${lessonId}`, updatedLesson, { headers });
}

}
