import { Component, OnInit } from '@angular/core';

import { TComponent } from '../T/T.component';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'UT',
  template: '<div *ngIf="!_inline">{{ _translatedStr }}</div><span *ngIf="_inline">{{ _translatedStr }}</span>',
  styles: []
})

/**
 * A translation component with escaped variables
 * @param {string} _str
 * @param {string} _key
 * @param {string} _context
 * @param {string} _comment
 * @param {number} _charlimit
 * @param {string} _tags
 * @param {boolean} _escapeVars
 * @param {boolean} _inline
 */
export class UTComponent extends TComponent implements OnInit {
  /**
   * Constructor
   * @param {TranslationService} translationService
   */    
  constructor(translationService: TranslationService) {
    super(translationService);
    this._escapeVars = true;
  }
}
