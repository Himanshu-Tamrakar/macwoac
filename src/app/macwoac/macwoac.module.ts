import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';

import { MacwoacRoutingModule } from './macwoac-routing.module';
import { HomeComponent } from './home/home.component';
import { InputEventDirective } from './core/directives/input-event.directive';
import { SearchPipe } from './core/filters/search.pipe';
import { SubscibalService } from './core/services/subscibal.service';
import { MobileComponent } from './home/mobile/mobile.component';
import { DesktopComponent } from './home/desktop/desktop.component';
import { DropDownComponent } from './home/drop-down/drop-down.component';
// import { CommonService } from './core/services/common.service';

@NgModule({
  declarations: [HomeComponent, InputEventDirective, SearchPipe, MobileComponent, DesktopComponent, DropDownComponent],
  imports: [
    CommonModule,
    MacwoacRoutingModule,
    HttpClientModule
  ],
  providers: [SubscibalService]
})
export class MacwoacModule { }
