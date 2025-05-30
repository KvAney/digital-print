import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/video.service';
import { Video } from '../models/video.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categories: { name: string, percentage: number, videos: Video[] }[] = [];
  selectedCategory: string | null = null;
selectedStat: any;

  constructor(private youtubeService: DataService) {}

  ngOnInit() {
    const allVideos = this.youtubeService.getGroupedCategoryData();
    const total = Object.values(allVideos).reduce((sum, v) => sum + v.length, 0);

    this.categories = Object.entries(allVideos).map(([name, videos]) => ({
      name,
      percentage: Math.round((videos.length / total) * 100),
      videos
    }));
  }

  onBadgeClick(categoryName: string) {
    this.selectedCategory = categoryName;
  }

  getVideosForCategory(category: string) {
    return this.categories.find(cat => cat.name === category)?.videos || [];
  }
}
