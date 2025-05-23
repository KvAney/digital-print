import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent {
  @Input() category!: string;
  @Output() close = new EventEmitter<void>();
}
