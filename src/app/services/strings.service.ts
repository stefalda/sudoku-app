import { Injectable } from '@angular/core';
import LocalizedStrings from 'localized-strings';
import * as stringsJson from '../../locale/messages.json';
@Injectable({ providedIn: 'root' })
export class StringsService {

  private strings;
  constructor() {
    this.strings = new LocalizedStrings(stringsJson);
    // console.log(this.strings);
  }

  getString(key: string) {
    return this.strings.getString(key);
  }

}
