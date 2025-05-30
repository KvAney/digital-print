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

  @Input() videos: Video[] = [];
@Input() selectedCategory: string = "";

@Input() badgeStats: {
  count: number;
  percentage: number;
  iconName: string;
  totalVideos:number;
}={count:0,percentage:0,iconName:"",totalVideos:0};


  @Output() deleteVideo: EventEmitter<string> = new EventEmitter<string>();

  onDelete(videoId: string): void {
    this.deleteVideo.emit(videoId);
  }
}
