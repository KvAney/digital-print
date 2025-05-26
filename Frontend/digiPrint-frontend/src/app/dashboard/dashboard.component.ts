import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/video.service';
import { Video } from '../models/video.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // All categories with video list and stats
  categories: { name: string, percentage: number, count: number, videos: Video[], iconName:string }[] = [];
  groupedVideos: { [category: string]: Video[] } = {};

  // Selected badge
  selectedCategory: string | null = null;
  selectedStat: { name: string, percentage: number, count: number,totalVideos: number,iconName:string } | null = null;
  filteredVideos: Video[] = [];

  totalVideos = 0;

  constructor(private youtubeService: DataService) {}

  ngOnInit(): void {
  console.log('Calling backend...');  
  this.youtubeService.getGroupedCategoryData().subscribe(data => {
    this.groupedVideos = data;
    console.log('✅ Processed backend data:', data);
     const iconMap: { [category: string]: string } = {
        Comedy: 'laugh',
        Sports: 'football-ball',
        Politics: 'landmark',
        Education: 'book-open',
        Music: 'music'
        // Add more as needed
      };

    this.totalVideos = Object.values(this.groupedVideos).reduce((sum, videos) => sum + videos.length, 0);

    this.categories = Object.entries(this.groupedVideos).map(([name, videos]) => ({
      name, 
      count: videos.length,
      iconName: iconMap[name] || 'film',
      percentage: Math.round((videos.length / this.totalVideos) * 100),
      videos
    }));
    console.log('🧾 Categories created:', this.categories);
  });
}
getIcon(category: string): string {
  const iconMap: { [category: string]: string } = {
    Comedy: 'laugh',
    Sports: 'football-ball',
    Politics: 'landmark',
    Education: 'book-open',
    Music: 'music'
  };
  return iconMap[category] || 'film';
}


  onCategorySelected(categoryName: string): void {
    this.selectedCategory = categoryName;

    const stat = this.categories.find(c => c.name === categoryName);
    if (stat) {
      this.selectedStat = {
        totalVideos: this.totalVideos,
        name: stat.name,
        count: stat.count,
        percentage: stat.percentage,
        iconName: stat.iconName
      };
      this.filteredVideos = stat.videos;
    } else {
      this.selectedStat = null;
      this.filteredVideos = [];
    }
  }

deleteVideo(videoId: string): void {
  this.youtubeService.removeLike(videoId).subscribe({
    next: () => {
      // Remove from local list
      this.filteredVideos = this.filteredVideos.filter(video => video.id !== videoId);

      // Also update main category list
      if (this.selectedCategory) {
        const category = this.categories.find(c => c.name === this.selectedCategory);
        if (category) {
          category.videos = category.videos.filter(v => v.id !== videoId);
          category.count = category.videos.length;
          category.percentage = Math.round((category.count / this.totalVideos) * 100);
        }
      }

      this.totalVideos -= 1;
    },
    error: (err) => {
      console.error('❌ Failed to remove like:', err);
    }
  });
}



 
}
