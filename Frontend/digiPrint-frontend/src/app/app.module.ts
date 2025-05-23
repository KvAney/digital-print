import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryBadgeComponent } from './dashboard/category-badge/category-badge.component';
import { VideoListComponent } from './dashboard/video-list/video-list.component';
import { CategoryViewComponent } from './dashboard/category-view/category-view.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CategoryBadgeComponent,
    VideoListComponent,
    CategoryViewComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
