import { Injectable } from '@angular/core';
import { Video } from '../models/video.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:5000';  // Adjust if running on a different port or deployed

  constructor(private http: HttpClient) {}


  getGroupedCategoryData(): Observable<{ [category: string]: Video[] }> {
    console.log("Gettinf data");
     return this.http.get<{response:{[category: string]: Video[]}}>('http://localhost:5000/getDetails',{ withCredentials: true })
     .pipe(map(data => {
        console.log('✅ Extracted categories:', data.response);  // should print your category-wise data
      
        return data.response;
       }),
      catchError(error => {
        console.error('❌ API Error:', error);
        if (error.status === 401 || error.status === 403) {
          // 👇 Redirect to backend /auth to trigger OAuth flow
          window.location.href = `${this.baseUrl}/auth`;
        }
        return throwError(() => error);
      }
      
      ))
      
  } 
    removeLike(videoId: string): Observable<any> {
  return this.http.post('http://localhost:5000/removeLike', { video_id: videoId },{withCredentials:true});
}
}
