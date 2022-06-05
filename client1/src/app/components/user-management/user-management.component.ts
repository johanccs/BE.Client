import { Component, OnInit } from '@angular/core';
import { NewUser } from 'src/app/models/newUser';
import { AuthService } from 'src/app/services/Auths/auth.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';

interface Role {
  name: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  providers: [MessageService]
})
export class UserManagementComponent implements OnInit {

  roles: Role[];
  selectedRole: Role;
  newUser: NewUser;
  showErr: boolean = false;
  errDescription: string = "Invalid password confirmation"
  confirmPassword: string;
  canSave: boolean = false;
  buttonCaption: string = 'Submit';

  constructor(private authService: AuthService, private messageService: MessageService)
  { 
    this.roles = [
      { name: "Admin"},
      { name: "User" },
      { name: "Guest" }
    ]
  }

  ngOnInit(): void
  {
    this.newUser = new NewUser('', '', '', '', '');
    this.confirmPassword = '';
  }

  submit(){
    this.buttonCaption = 'Please wait..';
    if (!this.canSave) {
      this.showError("Validation failed", "Password confirmation failed");
      return;
    }

    this.authService.registerUser(this.newUser).subscribe(data => {
      this.buttonCaption = 'Submit';
      this.showSuccess("Success", "User saved");
    }, err => {
      this.showError("Error", err.error);
      this.buttonCaption = "Submit";
    });
  }

  validate(ev){
    this.showErr = true;
    this.confirmPassword += ev;

    if (this.confirmPassword === this.newUser.password) {
      this.errDescription = 'Password confirm';
      this.confirmPassword = '';
      this.canSave = true;
    } else {
      this.canSave = false;
    }
  }

  showSuccess(summaryArg: string, detailArg: string){
    this.messageService.add({key: 't1', severity: 'success', summary: summaryArg, detail: detailArg});
  }

  showError(summaryArg: string, detailArg: string){
    this.messageService.add({key: 't1', severity: 'error', summary: summaryArg, detail: detailArg});
  }

  showBusy(){
    this.messageService.add({key: 't1', severity: 'warn', summary: 'Is  Busy', detail: 'Signing in. Please wait...'});
  }
}
