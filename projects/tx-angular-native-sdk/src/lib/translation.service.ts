import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

const { tx, t } = require('@transifex/native');

export interface ITranslationServiceConfig {
  token: string;
  secret: string;
  sourceLocale: string;
}

export interface ILanguage {
  code: string;
  name: string;
}

// This ensures singleton instance
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // Observable for detect locale change
  private localeChangedSource = new ReplaySubject<boolean>(0);
  localeChanged$ = this.localeChangedSource.asObservable();

  // Observable for detect translation change
  private contentTranslatedSource = new ReplaySubject<boolean>(0);
  contentTranslated$ = this.contentTranslatedSource.asObservable();

  constructor() { }

  async init(config: ITranslationServiceConfig) {
    tx.init({
      token: config.token,
      secret: config.secret,
      sourceLocale: config.sourceLocale,
    });
    await this.getLanguages();
  }

  async setLocale(locale: string) {
    await tx.setCurrentLocale(locale);
    this.localeChangedSource.next(true);
  }

  getLanguages() {
    return new Promise<ILanguage[]>((resolve, reject) => {
      tx.getLanguages().then((languages: ILanguage[]) => {
        resolve(languages);
      });
    });
  }

  translate(str: string, key: string): string {
    this.contentTranslatedSource.next(true);
    return t(str, { _key: key });
  }
}
