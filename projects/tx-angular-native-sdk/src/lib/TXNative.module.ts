import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LanguagePickerComponent } from './language-picker/language-picker.component';
import { TComponent } from './T/T.component';
import { TranslatableStringDecoratorService } from './translatable-string.decorator';
import { TranslationService } from './translation.service';
import { UTComponent } from './UT/UT.component';


@NgModule({
  declarations: [TComponent, UTComponent, LanguagePickerComponent],
  imports: [BrowserModule],
  exports: [TComponent, UTComponent, LanguagePickerComponent]
})
export class TxNativeModule {
  public constructor(service: TranslatableStringDecoratorService) {}

  /**
   * Use this method in your root module to provide the TranslationService
   */
  static forRoot(): ModuleWithProviders<TxNativeModule> {
    return {
      ngModule: TxNativeModule,
      providers: [
        TranslationService,
        TranslatableStringDecoratorService
      ]
    };
  }

  /**
   * Use this method in your other (non root) modules to import the directive/pipe
   */
  static forChild(): ModuleWithProviders<TxNativeModule> {
    return {
      ngModule: TxNativeModule,
      providers: [
        TranslationService,
        TranslatableStringDecoratorService
      ]
    };
  }
}
