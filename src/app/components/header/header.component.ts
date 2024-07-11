import { Component, Input, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import { AppSettings } from '../../services/app-settings.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';

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

  constructor(private renderer: Renderer2, public appSettings: AppSettings) {
  }
}
