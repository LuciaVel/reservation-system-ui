import { Component, OnInit } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelComponent } from '../../../panel/panel.component';
import { AdminUserManagementService } from '../../../../service/main-services/admin/admin-user-management.service';

@Component({
    standalone: true,
    selector: 'admin-update-user',
    templateUrl: './admin-user-detail.component.html',
    imports: [
      PanelComponent,
      NgFor,
      ReactiveFormsModule,
      NgClass,
      NgIf
    ]
})

export class AdminUpdateUserComponent implements OnInit{
  userDetailForm: FormGroup;
  isEditMode: boolean;
  userId: number;

  constructor(private router: Router, private route: ActivatedRoute, private adminUserManagementService: AdminUserManagementService, private formBuilder: FormBuilder) {
    this.userDetailForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    console.log("onInit");
    this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.userId = +id;
          this.isEditMode = true;
          this.fetchUserDetail(this.userId);
        }
    });
  }

  fetchUserDetail(id: number): void{
    this.adminUserManagementService.getUserDetailById(id).subscribe({
        next: (resp: any) => {
            console.log(resp);
            this.userDetailForm.patchValue({
                firstName: resp.userDetail.firstName,
                lastName: resp.userDetail.lastName,
                email: resp.userDetail.email,
            });
        },
        error: (error) => console.error('Error getting user detail', error)
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin-user-management']);
  }

  onSubmit(): void {
    if (this.userDetailForm.valid) {
      this.adminUserManagementService.updateUser(this.userId, this.userDetailForm.value).subscribe({
        next: (resp: any) => {
            console.log('User processed successfully');
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
