
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrlauth ="http://localhost:3000/api";

  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(`${this.apiUrlauth}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('role', response.role);
        })
      );
  }

  register(user: { name: string; email: string; password: string; role: string }): Observable<any> {
  
    sessionStorage.setItem('role', user.role)
    return this.http.post(`${this.apiUrlauth}/auth/register`, user);
  }
  saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }
  private apiUrlcours ="http://localhost:3000/api";
  // getCourses(): Observable<any> {
  //   const token = sessionStorage.getItem('token'); // קבלת הטוקן מה-sessionStorage
  
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
  //   });

  //   return this.http.get(`${this.apiUrlcours}/courses`, { headers });
  // }
  getCourses(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    console.log('Fetching courses with token:', token); // לוג הטוקן (ודא שהוא לא רגיש)
    
    return this.http.get(`${this.apiUrlcours}/courses`, { headers }).pipe(
      tap(data => console.log('Received courses:', data)), // לוג התגובה
      catchError(error => {
        console.error('Error fetching courses:', error); // לוג שגיאות
        return throwError(error); // זרוק את השגיאה הלאה
      })
    );
  }
  
//   addCourse(course: any): Observable<any> {
//     return this.http.post(`${this.apiUrlcours}/courses`, course);
// }
}