import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:3000/api/courses'; // החלף ב-URL של ה-API שלך

  constructor(private http: HttpClient) { }

  
  enroll(courseId: string, userId: string): Observable<any> {
     const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        console.log('Sending userId:', userId);

        // const body=userId
        // console.log(body)
    return this.http.post(`${this.apiUrl}/${courseId}/enroll` ,{userId},{headers});
  }

  leaveCourse(courseId: string,userId:string): Observable<any> {
    const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      
        return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, {
          headers,
          body: { userId } // העברת userId בגוף הבקשה
      });
  }
 
}
