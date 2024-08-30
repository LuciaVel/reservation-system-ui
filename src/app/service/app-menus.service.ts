import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppMenuService {
	getAppMenus() {
		return [{
			'icon': 'fa fa-users',
			'title': 'User Management',
			'url': '/admin-user-management'
		}];
	}
}