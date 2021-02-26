import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TranslationService } from './translation.service';

@Component({
  selector: 'T',
  template: '{{ _translatedStr }}',
  styles: []
})
export class TComponent implements OnInit {
  @Input()
  str: string = '';
  @Input()
  key: string = '';

  _translatedStr: string = '';

  localeChanged$ = new Observable<boolean>();

  constructor(private translationService: TranslationService) {
    this.localeChanged$ = translationService.localeChanged$;
    this.localeChanged$.subscribe(() => {
      this.translate();
    });
  }

  ngOnInit(): void {
    this.translate();
  }

  translate() {
    this._translatedStr =
      this.translationService.translate(this.str, this.key);
  }
}
