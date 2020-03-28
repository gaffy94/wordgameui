import { Component, OnInit } from '@angular/core';
import { fetchAllLevels, getLevelWords, fetchUserInfo } from 'src/app/constants/endpoints';
import { RestclientService } from 'src/app/services/restclient/restclient.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-finalscore',
  templateUrl: './finalscore.component.html',
  styleUrls: ['./finalscore.component.scss']
})
export class FinalscoreComponent implements OnInit {

  constructor(private restClient: RestclientService, private spinner: NgxSpinnerService
    , private toastrService: ToastService, private router: Router, private userService: UserService, private spinnerX: SpinnerService) { }
    gameLevels:any[] = [];
    user:any = {};
  async ngOnInit() {
    // fetch User Info
    await this.fetchUserInfo();
    // fetch all levels
    await this.fetchAllLevels();

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
  }

  async fetchAllLevels(){
    this.spinnerX.startSpinner('sp2', this.spinner);
    const link = fetchAllLevels.apiUrl;
    let resp = await this.restClient.funcGetWithoutSpinner(link);

    if (resp.error != null || !resp) {
      this.toastrService.showToast('danger', "Application Message", "Error Fetching User Info");
      this.spinnerX.stopSpinner('sp2', this.spinner);
      return;
    }
    console.log(resp.response);
    this.gameLevels = resp.response.data;
    await this.asyncForEach(this.gameLevels,async (gl) => {
      const lItems = await this.getLevelItems(gl);
      gl.data = lItems['data'];
      gl.levelScore = lItems['levelScore'];
   });

   this.spinnerX.stopSpinner('sp2', this.spinner);
    console.log(this.gameLevels);
  }

  async getLevelItems(level){
    console.log("getting level items for level : ");
    console.log(level);
    const link = getLevelWords.apiUrl;
    let resp = await this.restClient.funcGetWithoutSpinner(link.replace("{level}",level.level));

    if (resp.error != null || !resp) {
      this.toastrService.showToast('danger', "Application Message", "Error Fetching User Info");
      this.spinnerX.stopSpinner('sp2', this.spinner);
      return;
    }
    resp.response.levelScore =0;
    resp.response.data.forEach((mw) =>{
      resp.response.levelScore+=mw.wordScore;
    });
    console.log(resp.response);
    return resp.response;
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}
