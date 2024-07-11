import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PanelComponent } from '../../../panel/panel.component';
import { MasterDataService } from '../../../../services/main-services/master-data/master-data.service'
import { RoleList } from '../../../../interfaces/master-data/master-data.interface';
import { AdminUserManagementService } from '../../../../services/main-services/admin/admin-user-management.service';


@Component({
    standalone: true,
    selector: 'admin-add-user',
    templateUrl: './admin-user-detail.component.html',
    imports: [
      PanelComponent,
      NgFor,
      ReactiveFormsModule,
      NgClass,
      NgIf
    ]
})

export class AdminAddUserComponent implements OnInit{
  roleList = {} as RoleList;
  selectedRoleId: number;
  userDetailForm: FormGroup;
  isEditMode: boolean;

  constructor(private router: Router, private masterDataService: MasterDataService, private adminUserManagementService: AdminUserManagementService, private formBuilder: FormBuilder) {
    this.isEditMode = false;
    this.userDetailForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      roleId: [2, Validators.required]
    }, {
      validators: this.confirmPasswordMatchValidator
    });
  }

  ngOnInit(): void {
    this.fetchRoles();
  }

  // setDefaultRole(): void {
  //   if (!this.selectedRoleId && this.roleList.RoleList?.length > 0) {
  //     this.selectedRoleId = this.roleList.RoleList[1].id;
  //   }
  // }

  confirmPasswordMatchValidator(form: FormGroup) {
    console.log(form.get('password').value === form.get('confirmPassword').value ? null : { passwordMismatch: true });
    return form.get('password').value === form.get('confirmPassword').value ? null : { passwordMismatch: true };
  }

  fetchRoles(): void {
    this.masterDataService.getRoles().subscribe(
      (resp: any) => {
        console.log(resp.roleList);
        this.roleList.RoleList = resp.roleList;
        //this.setDefaultRole();
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/admin-user-management']);
  }

  onSubmit(): void {
    if (this.userDetailForm.valid) {
      this.adminUserManagementService.createUser(this.userDetailForm.value).subscribe({
        next: (response) => {
          console.log('User created successfully', response);
          this.router.navigate(['/admin-user-management']);
        },
        error: (error) => {
          console.error('Error creating user', error);
        }
      });
    } else {
      console.log('Form is not valid');
      this.userDetailForm.markAllAsTouched();
    }
  }
}
