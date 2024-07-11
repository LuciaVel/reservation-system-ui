import { Component, ViewChild, AfterViewInit } 		 from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'panel',
    inputs: ['title', 'variant', 'noBody', 'noButton', 'headerClass', 'bodyClass', 'footerClass', 'panelClass'],
    templateUrl: './panel.component.html',
    standalone: true,
    imports: [NgIf, NgClass]
})

export class PanelComponent implements AfterViewInit {
  @ViewChild('panelFooter', { static: false }) panelFooter;
  expand = false; 
  reload = false;
  collapse = false;
  remove = false;
  showFooter = false;
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.showFooter = (this.panelFooter) ? this.panelFooter.nativeElement && this.panelFooter.nativeElement.children.length > 0 : false;
    });
  }

  panelExpand() {
    this.expand = !this.expand;
  }
  panelReload() {
    this.reload = true;

    setTimeout(() => {
      this.reload = false;
    }, 1500);
  }
  panelCollapse() {
    this.collapse = !this.collapse;
  }
  panelRemove() {
    this.remove = !this.remove;
  }
}
