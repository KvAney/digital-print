import { Injectable } from '@angular/core';
import { Video } from '../models/video.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private videos: Video[] = [
    { id: '1', title: 'Politics 1', description: '', category: 'Politics', thumbnailUrl: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Entertainment 1', description: '', category: 'Entertainment', thumbnailUrl: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Sports 1', description: '', category: 'Sports', thumbnailUrl: 'https://via.placeholder.com/150' },
    { id: '4', title: 'Politics 2', description: '', category: 'Politics', thumbnailUrl: 'https://via.placeholder.com/150' },
    { id: '5', title: 'Entertainment 2', description: '', category: 'Entertainment', thumbnailUrl: 'https://via.placeholder.com/150' },
  ];

  private baseUrl = 'http://127.0.0.1:5000';  // Adjust if running on a different port or deployed

  constructor(private http: HttpClient) {}


  getGroupedCategoryData(): Observable<{ [category: string]: Video[] }> {
    console.log("Gettinf data");
     return this.http.get<{response:{[category: string]: Video[]}}>('http://localhost:5000/getDetails')
     .pipe(map(data => {
        console.log('✅ Extracted categories:', data.response);  // should print your category-wise data
      
        return data.response;
       }));
      


    // return this.videos.reduce((acc, video) => {
    //   acc[video.category] = acc[video.category] || [];
    //   acc[video.category].push(video);
    //   return acc;
    // }, {} as { [category: string]: Video[] });
  } 
    removeLike(videoId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/removeLike`, { videoId });
  }
}
