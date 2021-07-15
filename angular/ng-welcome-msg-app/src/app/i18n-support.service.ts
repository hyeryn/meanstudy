import { Injectable } from '@angular/core';
import { LANG_METADATA } from './lang-metadata';

@Injectable({
  providedIn: 'root'
})
export class I18nSupportService {
  langCode = 'ko';
  private welcomeMsg: any;

  constructor() { 
    this.welcomeMsg = {
      'ko': '안녕하세요',
      'en': 'hello',
      'ja': 'おはようございます',
      'fr' : 'bonjour',
      'ch' : '你好'
    }
  }

  getWelcomeMsgByCode(userName: string){
    let langData: any;
    langData = LANG_METADATA.find(lang=>lang.code === this.langCode);
    //const helloMsg = this.welcomeMsg[this.langCode];
    return `${langData.msg}, ${userName}!`
  }
}
