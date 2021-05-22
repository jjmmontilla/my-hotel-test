import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FirstCapitalDirective } from './directives/first-capital.directive';
import { UppercaseDirective } from './directives/uppercase.directive';
import { MomentPipe } from './pipes/moments.pipe';
import { DialogComponent } from './components/dialog/dialog.component';
import { BannerComponent } from './components/banner/banner.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FirstCapitalDirective,
    UppercaseDirective,
    MomentPipe,
    UppercaseDirective,
    FirstCapitalDirective,
    DialogComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MomentPipe,
    UppercaseDirective,
    FirstCapitalDirective,
    BannerComponent
  ]
})
export class SharedModule { }
