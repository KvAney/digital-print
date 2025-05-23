import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-badge',
  templateUrl: './category-badge.component.html',
  styleUrls: ['./category-badge.component.css']
})
export class CategoryBadgeComponent {
  @Input() category!: string;
  @Input() percentage!: number;
  @Input() totalVideos!: number;
  @Input() count!: number;
  @Input() iconName!: string;
  @Output() badgeClick = new EventEmitter<string>();

  getRotationStyle(percentage: number) {
  const degrees = (percentage / 100) * 180;
  return {
    transform: `rotate(${degrees}deg)`
  };
}

  onClick() {
    this.badgeClick.emit(this.category);
  }
}
