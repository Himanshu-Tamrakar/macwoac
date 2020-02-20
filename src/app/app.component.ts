import { Component } from '@angular/core';
import { CommonService } from './macwoac/core/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'macwoac';
  constructor(private _cs:CommonService) {
    alert('setting cookies in https://jsonpath-autocomplete.herokuapp.com/')
    const cookieName = 'from macowac';
    const cookieValue = 'Hi There';
    const myDate = new Date();
    myDate.setMonth(myDate.getMonth() + 12);
    document.cookie = cookieName +"=" + cookieValue + ";expires=" + myDate + ";domain=jsonpath-autocomplete.herokuapp.com;path=/";

  }
}
