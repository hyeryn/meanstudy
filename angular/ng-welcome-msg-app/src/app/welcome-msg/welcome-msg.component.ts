import { AfterViewInit, Component, OnInit } from '@angular/core';
import { I18nSupportService } from '../i18n-support.service';

@Component({
  selector: 'app-welcome-msg',
  templateUrl: './welcome-msg.component.html',
  styleUrls: ['./welcome-msg.component.css']
})
export class WelcomeMsgComponent implements AfterViewInit{

  userName = '';
  private valid = false;
  private static CHK_KEYUP_WAIT_SEC = 5000;
  welcomeMsg: string | undefined;

  constructor(public i18nSupporter: I18nSupportService) { }

  ngAfterViewInit() {
    const checkTouchedFn = () =>{
      if(this.valid) return;
      alert('이름을 입력하세요');
    }
    setTimeout(checkTouchedFn, WelcomeMsgComponent.CHK_KEYUP_WAIT_SEC);
  }
  title = 'ng-welcome-msg-app';

  onKeyUp(name: string){
    this.valid = name.length > 0;
  }

  setName(name: string){
    this.userName = name;
  }

  onChange(){
    this.valid = this.userName.length >0 ;
  }

  showWelcomeMsg(){
    this.welcomeMsg = this.i18nSupporter.getWelcomeMsgByCode(this.userName,'ko');
  }
}
