import { Inject, Injectable } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorage;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
  }

  public saveData(key: string, value: string) {
    this.localStorage?.setItem(key, value);
  }

  public getData(key: string) {
    return this.localStorage?.getItem(key)
  }
  public removeData(key: string) {
    this.localStorage?.removeItem(key);
  }

  public clearData() {
    this.localStorage?.clear();
  }
}
