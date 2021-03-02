import { AfterViewChecked, ChangeDetectorRef, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { TranslationService } from './translation.service';
import { equals, isDefined } from './util';

@Directive({
  selector: '[translate],[tx-translate]'
})
export class TranslateDirective implements AfterViewChecked, OnDestroy {
  key: string = '';
  str: string = '';
  currentParams: any;
  // Observable for detecting locale changes
  localeChanged$ = new Observable<boolean>();


  @Input() set translate(str: string) {
    if (str) {
      this.str = str;
      this.checkNodes();
    }
  }

  @Input() set translateKey(key: string) {
    if (key) {
      this.key = key;
      this.checkNodes();
    }
  }

  @Input() set translateParams(params: any) {
    if (!equals(this.currentParams, params)) {
      this.currentParams = params;
      this.checkNodes();
    }
  }

  constructor(private translationService: TranslationService, private element: ElementRef, private _ref: ChangeDetectorRef) {
    // subscribe to localeChanged$ observable, in case the language changes
    if (!this.localeChanged$) {
      this.localeChanged$ = this.translationService.localeChanged$;
      this.localeChanged$.subscribe(() => {
        this.checkNodes();
      });
    }
  }

  ngAfterViewChecked() {
    this.checkNodes();
  }

  checkNodes() {
    let nodes: NodeList = this.element.nativeElement.childNodes;
    // if the element is empty
    if (!nodes.length) {
      // we add the key as content
      this.setContent(this.element.nativeElement, this.key);
      nodes = this.element.nativeElement.childNodes;
    }
    for (let i = 0; i < nodes.length; ++i) {
      let node: any = nodes[i];
      if (node.nodeType === 3) { // node type 3 is a text node
        this.updateValue(this.key, node);
      }
    }
  }

  updateValue(key: string, node: any) {
    if (key) {
      let res = this.translationService.getParsedResult(this.str, this.key, this.currentParams);
      if (!node.originalContent) {
        node.originalContent = this.getContent(node);
      }
      node.currentValue = isDefined(res) ? res : (node.originalContent || key);
      this.setContent(node, node.currentValue);
      this._ref.markForCheck();
    }
  }

  getContent(node: any): string {
    return isDefined(node.textContent) ? node.textContent : node.data;
  }

  setContent(node: any, content: string): void {
    if (isDefined(node.textContent)) {
      node.textContent = content;
    } else {
      node.data = content;
    }
  }

  ngOnDestroy() {
  }
}