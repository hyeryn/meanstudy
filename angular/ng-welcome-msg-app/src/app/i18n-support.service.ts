import { Injectable } from '@angular/core';

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
    const helloMsg = this.welcomeMsg[this.langCode];
    return `${helloMsg}, ${userName}!`
  }
}
