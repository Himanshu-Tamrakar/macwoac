import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { CommonService } from './common.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, HttpClientModule
  ]
})
export class StaticModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StaticModule,
      providers: [CommonService]
    };
  }
}
