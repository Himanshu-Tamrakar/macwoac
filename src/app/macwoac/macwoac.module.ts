import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MacwoacRoutingModule } from './macwoac-routing.module';
import { HomeComponent } from './home/home.component';
import { InputEventDirective } from './core/directives/input-event.directive';
import { SearchPipe } from './core/filters/search.pipe';
import { SubscibalService } from './core/services/subscibal.service';

@NgModule({
  declarations: [HomeComponent, InputEventDirective, SearchPipe],
  imports: [
    CommonModule,
    MacwoacRoutingModule
  ],
  providers: [SubscibalService]
})
export class MacwoacModule { }
