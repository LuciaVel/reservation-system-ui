import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Home
import { HomePage } from './pages/home/home';

// Error
import { ErrorPage } from './pages/error/error';

import { AdminUserManagementComponent } from './components/main-components/admin/admin-user-management/admin-user-management.component';
import { AdminAddUserComponent } from './components/main-components/admin/admin-user-detail/admin-add-user.component';
import { AdminUpdateUserComponent } from './components/main-components/admin/admin-user-detail/admin-update-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin-user-management', pathMatch: 'full' },
  { path: 'admin-user-management', component: AdminUserManagementComponent, data: { title: 'Admin User Management'} },
  { path: 'admin-add-user', component: AdminAddUserComponent, data: { title: 'Add New User'} },
  { path: 'admin-update-user/:id', component: AdminUpdateUserComponent, data: { title: 'Update User'} },
  
	{ path: '**', component: ErrorPage, data: { title: '404 Error'} }
];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
