import { Component, Input, OnInit } from '@angular/core';
import { ILanguage, TranslationService } from '../translation.service';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.css']
})
export class LanguagePickerComponent implements OnInit {
  @Input()
  className: string = '';
  languages: ILanguage[] = [];

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    const that = this;
    this.translationService.getLanguages().then((languages: ILanguage[]) => {
      that.languages = languages;
    });
  }

  async onChange(event: Event) {
    await this.translationService.setLocale(
      (event.target as HTMLSelectElement).value);
  }

}
