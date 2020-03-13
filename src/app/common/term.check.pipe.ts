import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'term_checker'
})
export class TermCheckPipe implements PipeTransform {

  transform(startDate: Date, endDate: Date): String {
    if (!endDate) return ''
    const d1 = moment(startDate)
    const d2 = moment(endDate)
    const days = moment.duration(d2.diff(d1)).asDays()
    const hours = moment.duration(d2.diff(d1)).asHours()
    if (days < 0) return 'Время вышло'
    if (days >= 1) return `Осталось ${days.toFixed()} дней`
    return `Осталось ${hours.toFixed()} часов`
  }
}
