import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FeatureComponent } from './pages/feature/feature.component';
import { ReviewComponent } from './pages/review/review.component';
import { ScreenshotComponent } from './pages/screenshot/screenshot.component';
import { DownloadComponent } from './pages/download/download.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    FeatureComponent,
    ReviewComponent,
    ScreenshotComponent,
    DownloadComponent,
    FooterComponent
  ],
  exports:[
    LayoutComponent
  ]
})
export class LayoutModule { }
