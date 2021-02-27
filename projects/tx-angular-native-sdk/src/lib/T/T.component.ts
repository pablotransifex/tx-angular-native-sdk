import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TranslationService } from '../translation.service';

@Component({
  selector: 'T',
  template: '{{ _translatedStr }}',
  styles: []
})

/**
 * A translation component
 * @param {string} _str
 * @param {string} _key
 * @param {string} _context
 * @param {string} _comment
 * @param {number} _charlimit
 * @param {string} _tags
 * @param {boolean} _escapeVars
 * @param {boolean} _inline
 */
export class TComponent implements OnInit {
  @Input()
  _str: string = '';
  @Input()
  _key: string = '';
  @Input()
  _context: string = '';
  @Input()
  _comment: string = '';
  @Input()
  _charlimit: number = 0;
  @Input()
  _tags: string = '';
  @Input()
  _escapeVars: boolean = false;
  @Input()
  _inline: boolean = false;

  _translatedStr: string = '';

  // Observable for detecting locale changes
  localeChanged$ = new Observable<boolean>();

  /**
   * Constructor
   * @param {TranslationService} translationService
   */  
  constructor(protected translationService: TranslationService) {
    this.localeChanged$ = translationService.localeChanged$;
    this.localeChanged$.subscribe(() => {
      this.translate();
    });
  }

  ngOnInit(): void {
    this.translate();
  }

  /**
   * Translate a string using the translation service
   */    
  translate() {
    this._translatedStr =
      this.translationService.translate(this._str, {
        _key: this._key,
        _context: this._context,
        _comment: this._comment,
        _tags: this._tags,
        _escapeVars: this._escapeVars,
        _charlimit: this._charlimit
      });
  }
}
