import { Component } from '@angular/core';
import { CommonService } from './macwoac/core/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'macwoac';
  constructor(private _cs:CommonService) {}
}
