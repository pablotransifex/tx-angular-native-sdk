import { Injectable } from '@angular/core';

import { ITranslateParams } from './interfaces';
import { TranslationService } from './translation.service';

/**
 * Service for static injection of translation service into decorator 
 */
@Injectable()
export class TranslatableStringDecoratorService {
     private static service: TranslationService | undefined = undefined;
     public constructor(service: TranslationService) {
      TranslatableStringDecoratorService.service = service;
     }
     public static getService(): TranslationService {
         if(!TranslatableStringDecoratorService.service) {
             throw new Error('TranslatableStringDecoratorService not initialized');
         }
         return TranslatableStringDecoratorService.service;
     }
}

/**
 * Decorator for using transparently the translation service as a property
 */
export const TranslatableString = (str: string, params: ITranslateParams) => {
  return function (target: any, key: string) {
    Object.defineProperty(target, key, { 
      configurable: false,
      get: () => {
        const translation = TranslatableStringDecoratorService.getService().translate(str, params);
        return translation;
      }
    });
  }
}

