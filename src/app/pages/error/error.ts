import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppSettings } from '../../service/app-settings.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'error',
    templateUrl: './error.html',
    standalone: true,
    imports: [RouterLink]
})

export class ErrorPage implements OnDestroy {
	constructor(public appSettings: AppSettings) {
    this.appSettings.appEmpty = true;
	}

  ngOnDestroy() {
    this.appSettings.appEmpty = false;
  }
}
