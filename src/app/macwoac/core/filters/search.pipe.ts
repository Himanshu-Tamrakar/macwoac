import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(sharedObject: any, ...args: any[]): any {
    console.log(sharedObject, args);
    return null;
  }

}
