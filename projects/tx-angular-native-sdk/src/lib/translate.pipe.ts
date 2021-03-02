import { ChangeDetectorRef, Injectable, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { isObservable, Observable } from 'rxjs';

import { TranslationService } from './translation.service';
import { equals, isDefined } from './util';

@Injectable()
@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  value: string = '';
  lastStr: string = '';
  lastParams: any[] = [];
  // Observable for detecting locale changes
  localeChanged$ = new Observable<boolean>();

  constructor(private translationService: TranslationService,
    private _ref: ChangeDetectorRef) { }

  updateValue(str: string, params?: Object): void {
    let res = this.translationService.getParsedResult(str, '', params);
    const _str = this.translationService.translate(res, {});
    this.value = res !== undefined ? _str : str;
    this.lastStr = str;
    this._ref.markForCheck();
  }

  transform(str: string, ...args: any[]): any {
    if (!str || !str.length) {
      return str;
    }

    if (equals(str, this.lastStr) && equals(args, this.lastParams)) {
      return this.value;
    }

    let params: Object = {};
    if (isDefined(args[0]) && args.length) {
      if (typeof args[0] === 'string' && args[0].length) {
        // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
        // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
        let validArgs: string = args[0]
          .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
          .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
        try {
          params = JSON.parse(validArgs);
        } catch (e) {
          throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${args[0]}`);
        }
      } else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
        params = args[0];
      }
    }

    // store the query, in case it changes
    this.lastStr = str;

    // store the params, in case they change
    this.lastParams = args;

    // set the value
    this.updateValue(str, params);

    // subscribe to localeChanged$ observable, in case the language changes
    if (!this.localeChanged$) {
      this.localeChanged$ = this.translationService.localeChanged$;
      this.localeChanged$.subscribe(() => {
        if (this.lastStr) {
          this.lastStr = ''; // we want to make sure it doesn't return the same value until it's been updated
          this.updateValue(str, params);
        }
      });
    }

    return this.value;
  }


  ngOnDestroy(): void {
  }
}
