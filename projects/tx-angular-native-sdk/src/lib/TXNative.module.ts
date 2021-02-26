import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LanguagePickerComponent } from './language-picker/language-picker.component';
import { TComponent } from './T.component';


@NgModule({
  declarations: [TComponent, LanguagePickerComponent],
  imports: [BrowserModule],
  exports: [TComponent, LanguagePickerComponent]
})
export class TxNativeModule { }
