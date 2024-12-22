import { inject, Pipe, PipeTransform } from '@angular/core';
import { StringsService } from '../services/strings.service';

@Pipe({
  name: 'localize'
})

export class LocalizedStringPipe implements PipeTransform {

  stringService = inject(StringsService);

  transform(value: any, ...args: any[]): any {
    return this.stringService.getString(value);
  }
}
