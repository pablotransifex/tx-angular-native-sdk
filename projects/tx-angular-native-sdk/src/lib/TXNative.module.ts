import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LanguagePickerComponent } from './language-picker/language-picker.component';
import { TComponent } from './T/T.component';
import { UTComponent } from './UT/UT.component';
import { TranslatePipe } from './translate.pipe';
import { TranslateDefaultParser, TranslateParser } from './translate.parser';
import { TranslationService } from './translation.service';
import { TranslateDirective } from './translate.directive';


@NgModule({
  declarations: [TComponent, UTComponent, LanguagePickerComponent, TranslatePipe, TranslateDirective],
  imports: [BrowserModule],
  exports: [TComponent, UTComponent, LanguagePickerComponent, TranslatePipe, TranslateDirective]
})
export class TxNativeModule {
  /**
   * Use this method in your root module to provide the TranslationService
   */
  static forRoot(): ModuleWithProviders<TxNativeModule> {
    return {
      ngModule: TxNativeModule,
      providers: [
        {provide: TranslateParser, useClass: TranslateDefaultParser},
        TranslationService
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
        {provide: TranslateParser, useClass: TranslateDefaultParser},
        TranslationService
      ]
    };
  }
}
