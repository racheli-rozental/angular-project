
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrlauth ="http://localhost:3000/api";

  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<{ token: string; role: string ;userId:string}> {
    return this.http.post<{ token: string; role: string ;userId:string}>(`${this.apiUrlauth}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('role', response.role);
          sessionStorage.setItem('uderId',response.userId)
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
  saveUserId(userId:string){
    sessionStorage.setItem('userId',userId);
  }
  private apiUrlcours ="http://localhost:3000/api";
 
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
  
  addCourse(course: { title: string; description: string; }): Observable<any> {
    console.log('Adding course:', course);
    const token = sessionStorage.getItem('token');
    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('Headers:', headers);
    return this.http.post(`${this.apiUrlcours}/courses`, course, { headers });
  }
  deleteCourse(courseId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrlcours}/courses/${courseId}`, { headers });
  }
  updateCourse(courseId: number, updates: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrlcours}/courses/${courseId}`, updates, { headers });
}


  getCourseDetails(courseId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrlcours}/courses/${courseId}`, { headers });
  }
  private userRoleSubject = new BehaviorSubject<string>(sessionStorage.getItem('role') || '');
  userRole$ = this.userRoleSubject.asObservable();

  setUserRole(role: string) {
    sessionStorage.setItem('role', role);
    this.userRoleSubject.next(role);
  }
}