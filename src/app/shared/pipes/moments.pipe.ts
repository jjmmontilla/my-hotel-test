import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {
  transform(date, format = 'MM/DD/YYYY', fromformat = 'YYYY/MM/DD HH:mm:ss') {

    if (format) {
      const res = moment(date, fromformat).format(format);
      return res;
    }
  }
}
