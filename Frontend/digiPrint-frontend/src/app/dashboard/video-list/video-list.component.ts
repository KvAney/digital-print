import { Component, Input,Output, EventEmitter } from '@angular/core';
import { Video } from '../../models/video.model';
import { HttpClient } from '@angular/common/http';

 
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
   constructor(private http: HttpClient) {}


// Delete(videoid:string) {
// console.log('Video id::',videoid );

//     this.http.post('http://localhost:5000/removeLike', { video_id: videoid },{ withCredentials: true })
//       .subscribe({
//         next: (res) => {
//         console.log('Deleted successfully:', res);
//       // ✅ Remove the video from the displayed list
//       this.videos = this.videos.filter(v => v.id !== videoid);
  
    
//     },
//         error: (err) => {console.error('❌ Error unliking video:', err)}
//       });




  @Input() videos: Video[] = [];
  @Output() deleteVideo: EventEmitter<string> = new EventEmitter<string>();

  onDelete(videoId: string): void {
    this.deleteVideo.emit(videoId);
  }
}
