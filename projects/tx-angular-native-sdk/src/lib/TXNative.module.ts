import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LanguagePickerComponent } from './language-picker/language-picker.component';
import { TComponent } from './T/T.component';
import { UTComponent } from './UT/UT.component';


@NgModule({
  declarations: [TComponent, UTComponent, LanguagePickerComponent],
  imports: [BrowserModule],
  exports: [TComponent, UTComponent, LanguagePickerComponent]
})
export class TxNativeModule { }
