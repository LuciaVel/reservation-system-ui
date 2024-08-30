import { Component, Input, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import { AppSettings } from '../../service/app-settings.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

declare var slideToggle: any;

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [NgIf, NgClass, ReactiveFormsModule, FormsModule]
})
export class HeaderComponent implements OnDestroy {
  	@Input() appSidebarTwo;
	@Output() appSidebarEndToggled = new EventEmitter<boolean>();
	@Output() appSidebarMobileToggled = new EventEmitter<boolean>();
	@Output() appSidebarEndMobileToggled = new EventEmitter<boolean>();

	logout = () => {
		localStorage.removeItem("jwt");
		this.router.navigate(['/login']);
	}
	
  toggleAppSidebarMobile() {
		this.appSidebarMobileToggled.emit(true);
  }
  
	toggleAppSidebarEnd() {
		this.appSidebarEndToggled.emit(true);
	}
	
  toggleAppSidebarEndMobile() {
		this.appSidebarEndMobileToggled.emit(true);
  }

	toggleAppTopMenuMobile() {
		var target = document.querySelector('.app-top-menu');
		if (target) {
			slideToggle(target);
		}
	}

	toggleAppHeaderMegaMenuMobile() {
	  this.appSettings.appHeaderMegaMenuMobileToggled = !this.appSettings.appHeaderMegaMenuMobileToggled;
	}

	ngOnDestroy() {
	  this.appSettings.appHeaderMegaMenuMobileToggled = false;
	}

  constructor(private renderer: Renderer2, public appSettings: AppSettings, private router: Router) {
  }
}
