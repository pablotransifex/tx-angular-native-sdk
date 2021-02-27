import { Component, Input, OnInit } from '@angular/core';

import { ILanguage } from '../interfaces';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.css']
})

/**
 * A language picker component with the available languages
 * already populated
 */
export class LanguagePickerComponent implements OnInit {
  @Input()
  className: string = '';

  languages: ILanguage[] = [];

  /**
   * Constructor
   * @param {TranslationService} translationService
   */
  constructor(private translationService: TranslationService) {
    this.getLanguages.bind(this);
  }

  ngOnInit(): void {
    this.getLanguages();
  }

  /**
   * Retrieves the available languages
   * @param {TranslationService} translationService
   */  
  async getLanguages() {
    this.languages = await this.translationService.getLanguages();
  }

  /**
   * Handles language selection changes
   * @param {Event} event
   */   
  async onChange(event: Event) {
    await this.translationService.setLocale(
      (event.target as HTMLSelectElement).value);
  }
}
