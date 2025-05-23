import { Component, Input } from '@angular/core';
import { Video } from '../../models/video.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
  @Input() videos: Video[] = [];
}
