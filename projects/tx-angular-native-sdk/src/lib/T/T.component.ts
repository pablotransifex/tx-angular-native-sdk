import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { ITranslateParams } from '../interfaces';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'T',
  template: '{{ _translatedStr }}',
  styles: []
})

/**
 * A translation component
 * @param {string} _str
 * @param {Object} _vars
 */
export class TComponent implements OnInit {
  @Input()
  _str: string = '';
  @Input()
  _vars: Object = {};

  _translateParams: ITranslateParams = {
    _key: '',
    _context: '',
    _comment: '',
    _charlimit: 0,
    _tags: '',
    _escapeVars: false,
    _inline: false,
  };
  _translatedStr: string = '';

  // Observable for detecting locale changes
  _localeChanged = new Observable<string>();

  /**
   * Constructor
   * @param {TranslationService} translationService
   */
  constructor(protected translationService: TranslationService) {
    this._localeChanged = translationService.localeChanged;
    this._localeChanged.subscribe((locale) => {
      this.translate();
    });
  }

  ngOnInit(): void { }

  /**
   * Input parameters change detector
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.translate();
  }

  /**
   * Translate a string using the translation service
   */
  translate() {
    this._translateParams = this._vars as ITranslateParams;
    this._translatedStr =
      this.translationService.translate(this._str,
        this._vars || {});
  }
}
