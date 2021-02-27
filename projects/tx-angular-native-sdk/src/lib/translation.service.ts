import { Injectable } from '@angular/core';
import { ITranslationServiceConfig, ILanguage } from './interfaces';
import { ReplaySubject } from 'rxjs';
import { ITranslateParams } from './interfaces';

const { tx, t } = require('@transifex/native');

/** Singleton Injection */
@Injectable({
  providedIn: 'root'
})

/**
 * Service which wraps the Transifex Native library for using
 * inside components
 */
export class TranslationService {
  // Observable for detecting locale change
  private localeChangedSource = new ReplaySubject<boolean>(0);
  localeChanged$ = this.localeChangedSource.asObservable();

  // Observable for detecting translation change
  private contentTranslatedSource = new ReplaySubject<boolean>(0);
  contentTranslated$ = this.contentTranslatedSource.asObservable();

  constructor() { }

  /**
   * Initializes the translation service
   * @param {ITranslationServiceConfig} config
   * @returns void
   */
  async init(config: ITranslationServiceConfig) {
    tx.init({
      token: config.token,
      secret: config.secret,
      sourceLocale: config.sourceLocale,
    });
    await this.getLanguages();
  }

  /**
   * Sets the current locale
   * @param {string} locale
   * @returns void
   */
  async setLocale(locale: string) {
    await tx.setCurrentLocale(locale);
    this.localeChangedSource.next(true);
  }

  /**
   * Gets the languages collection
   * @returns any
   */  
  async getLanguages() {
    return await tx.getLanguages();
  }

  /**
   * Translate a string
   * @param {string} str
   * @param {ITranslateParams} params
   * @returns void
   */  
  translate(str: string, params: ITranslateParams): string {
    this.contentTranslatedSource.next(true);
    return t(str, params);
  }
}
