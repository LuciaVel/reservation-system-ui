import { Component } from '@angular/core';
import { PanelComponent } from '../../components/panel/panel.component';

@Component({
    selector: 'home',
    templateUrl: './home.html',
    standalone: true,
    imports: [PanelComponent]
})

export class HomePage {
}
