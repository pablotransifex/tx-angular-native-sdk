import { Component, OnInit } from '@angular/core';

import { TComponent } from '../T/T.component';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'UT',
  template: `
    <div *ngIf="!_translateParams._inline" [innerHTML]="_translatedStr"></div>
    <span *ngIf="_translateParams._inline" [innerHTML]="_translatedStr"></span>
  `,
  styles: []
})

/**
 * A translation component with escaped variables
 * @param {string} _str
 * @param {string} _vars
 */
export class UTComponent extends TComponent implements OnInit {
  /**
   * Constructor
   * @param {TranslationService} translationService
   */    
  constructor(translationService: TranslationService) {
    super(translationService);
    Object.assign(this._translateParams, { _escapeVars: true });
  }
}
