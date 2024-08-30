import { Component, OnInit, Injectable } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AdminUserManagementService } from '../../../../service/main-services/admin/admin-user-management.service'; 
import { UserList, UserModel } from '../../../../interfaces/user-interfaces/user-detail.interface';
import { environment } from '../../../../../environments/environment';
import { PanelComponent } from '../../../panel/panel.component';
import { PaginationExtension } from '../../../../interfaces/common-interfaces/pagination-extension.interface';

@Component({
  standalone: true,
  selector: 'admin-user-management',
  templateUrl: './admin-user-management.component.html',
  imports: [
    PanelComponent,
    NgFor,
    RouterLink,
  ],
})

export class AdminUserManagementComponent implements OnInit {
  userList = {} as UserList;
  totalPages: number = 0;
  currPageNo: number = 1;
  pages: number[] = [];

  constructor(private router: Router, private adminUserManagementService: AdminUserManagementService) {}

  ngOnInit(): void {
    this.fetchUserList();
  }

  calculatePages() {
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    console.log(this.pages);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currPageNo = page;
    console.log(`Current page is now ${page}`);
  }

  fetchUserList() {
    const filter: PaginationExtension = {pageNo: this.currPageNo, pageSize: environment.pageSize};
    this.adminUserManagementService.getUserList(filter).subscribe(
      (resp: any) => {
        console.log(resp.userList);
        this.userList.UserList = resp.userList;
        this.userList.TotalRow = resp.totalRow;
        this.totalPages = Math.ceil(this.userList.TotalRow / environment.pageSize);
        this.calculatePages();
        console.log(this.totalPages);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  onDelete(id: number){
    this.adminUserManagementService.deleteUser(id).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.fetchUserList();
      },
      error: (error) => console.error('Error deleting user', error)
    });
  }

  onEdit(userId: number) {
    this.router.navigate(['/admin-update-user', userId]);
  }
}
