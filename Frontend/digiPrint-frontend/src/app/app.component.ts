import { Component } from '@angular/core';
import { CategoryBadgeComponent } from './dashboard/category-badge/category-badge.component';
import { CategoryViewComponent } from './dashboard/category-view/category-view.component';
import { VideoListComponent } from './dashboard/video-list/video-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  // imports: [CategoryBadgeComponent,CategoryViewComponent,VideoListComponent,DashboardComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'digiPrint-frontend';
}
