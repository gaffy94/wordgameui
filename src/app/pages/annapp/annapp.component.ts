import { Component, OnInit, ViewChild } from '@angular/core';
import { validateWord, fetchUserInfo, getWord, myWords, nextLevel, updateTime } from 'src/app/constants/endpoints';
import { RestclientService } from 'src/app/services/restclient/restclient.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-annapp',
  templateUrl: './annapp.component.html',
  styleUrls: ['./annapp.component.scss']
})


export class AnnappComponent implements OnInit {
  word: any;
  mywords: any[] = [];
  curLevelWord: any;
  description:any;
  user:any = {};
  levelScore= 0;
  notifyConfig: CountdownConfig = { leftTime: 1, demand: true, notify: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 205, 110, 115] };
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  constructor(private restClient: RestclientService, private spinner: NgxSpinnerService
    , private toastrService: ToastService, private router: Router, private userService: UserService, private spinnerX: SpinnerService) { }

  async ngOnInit() {

    // fetch user info with current level
    await this.fetchUserInfo();
    //fetch word at crrent level
    await this.fetchCurrentLevelWord();
    //fetch my words at current level
    await this.fetchMyLevelWords();
    // this.countdown.begin();
    this.countdown.restart();
    
  }

  async fetchUserInfo() {
    const link = fetchUserInfo.apiUrl;
    let resp = await this.restClient.funcGet(link, this.spinner, 'sp2');

    if (resp.error != null || !resp) {
      this.toastrService.showToast('danger', "Application Message", "Error Fetching User Info");
      this.spinnerX.stopSpinner('sp2', this.spinner);
      return;
    }

    this.userService.setUserInfo(resp.response);
    this.user = resp.response;
    console.log(this.user);
    this.notifyConfig.leftTime = this.user.timeRemaining;
    this.notifyConfig.demand = false;
    console.log(this.notifyConfig);
    this.countdown.config = this.notifyConfig;

    if(this.user.completed == "Y"){
      this.router.navigate(['app/finalscore']);
    }
  }

  async fetchCurrentLevelWord() {
    const link = getWord.apiUrl;
    let resp = await this.restClient.funcGet(link, this.spinner, 'sp2');

    if (resp.error != null || resp.response.responseCode !== "000") {
      this.toastrService.showToast('danger', "Application Message", resp.error ? resp.error : resp.response.responseMessage);
      this.spinnerX.stopSpinner('sp2', this.spinner);
      return;
    }
    console.log(resp.response);
    this.curLevelWord = resp.response.data.word;
    this.description  = resp.response.data.description;

  }

  async fetchMyLevelWords(){
    const link = myWords.apiUrl;
    let resp = await this.restClient.funcGet(link, this.spinner, 'sp2');

    if (resp.error != null || resp.response.responseCode !== "000") {
      this.toastrService.showToast('danger', "Application Message", resp.error ? resp.error : resp.response.responseMessage);
      this.spinnerX.stopSpinner('sp2', this.spinner);
      return;
    }
    console.log(resp.response);
    this.mywords = resp.response.data;
    await this.asyncForEach(this.mywords,async (mw) => {
      this.levelScore+=mw.wordScore;
   });
 
  }
  async submitWord() {
    const link = validateWord.apiUrl;
    let resp = await this.restClient.funcGet(link.replace("{word}", this.word), this.spinner, 'sp2');

    if (resp.error != null || resp.response.responseCode !== "000") {
      this.toastrService.showToast('danger', "Application Message",resp.error?resp.error:resp.response.responseMessage);
      this.spinnerX.stopSpinner('sp2', this.spinner);
      return;
    }

    await this.fetchMyLevelWords();
    this.spinnerX.stopSpinner('sp2', this.spinner);
    this.word = undefined;

  }

  async handleEvent(event){
    console.log(event);
    if(event.action == "done"){
      await this.nextLevel();
    } 
    if(event.action == 'notify'){
      this.updateCount(event.left/1000);
    }
  }

  async nextLevel(){
    const link = nextLevel.apiUrl;
    let resp = await this.restClient.funcGet(link.replace("{word}", this.word), this.spinner, 'sp2');
    if (resp.error != null || resp.response.responseCode !== "000") {
      this.toastrService.showToast('danger', "Application Message",resp.error?resp.error:resp.response.responseMessage);
      this.spinnerX.stopSpinner('sp2', this.spinner);
      return;
    }

    if(resp.response.data.completed === "Y"){
      // do final score stuff
      console.log("ill do final stuff");
      this.router.navigate(['app/finalscore']);
    } else {
   // fetch user info with current level
   await this.fetchUserInfo();
   //fetch word at crrent level
   await this.fetchCurrentLevelWord();
   //fetch my words at current level
   await this.fetchMyLevelWords();

   this.countdown.restart();

    }
  }

  async updateCount(data){
    const link = updateTime.apiUrl;
    let resp = await this.restClient.funcGetWithoutSpinner(link.replace("{rem}", data));
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

}
