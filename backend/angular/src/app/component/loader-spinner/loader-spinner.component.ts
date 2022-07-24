import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from "../../service/loader.service";
import { LoaderState } from '../../model/loader';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: 'loader-spinner.component.html',
  styleUrls: ['loader-spinner.component.scss']
})
export class LoaderSpinnerComponent implements OnInit {
  show = false;
  private subscription: Subscription;
  constructor(
    private loaderService: LoaderService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {

    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        let html = document.querySelector('html');
        if(this.loaderService.loaderData.length > 0){
            this.spinner.show();
            // html.style.overflowY = 'hidden';
          }else{
            console.log("Termine");
            this.spinner.hide();
            // html.style.overflowY = 'visible';
          }
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
