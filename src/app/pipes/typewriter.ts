import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of, interval, map, take } from 'rxjs';

@Pipe({
  name: 'typewriter',
  standalone: true
})
export class TypewriterPipe implements PipeTransform {
  transform(value: string | undefined | null, speed = 30): Observable<string> {
    if (!value) return of('');
    
    return interval(speed).pipe(
      take(value.length + 1),
      map(i => value.substring(0, i))
    );
  }
}
