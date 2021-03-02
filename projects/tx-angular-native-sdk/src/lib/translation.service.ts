import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { ITranslationServiceConfig } from './interfaces';

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
  public async init(config: ITranslationServiceConfig) {
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
  public async setLocale(locale: string) {
    await tx.setCurrentLocale(locale);
    this.localeChangedSource.next(true);
  }

  /**
   * Gets the languages collection
   * @returns any
   */
  public async getLanguages() {
    return await tx.getLanguages();
  }

  /**
   * Translate a string
   * @param {string} str
   * @param {Object} params
   * @returns void
   */
  public translate(str: string, params: Object): string {
    this.contentTranslatedSource.next(true);
    return t(str, params);
  }

  /**
   * Returns the parsed result of the translations
   */
  public getParsedResult(str: string, key: string, params?: Object): string {
    return this.translate(str, Object.assign({ _key: key }, params) || {});
  }
}
