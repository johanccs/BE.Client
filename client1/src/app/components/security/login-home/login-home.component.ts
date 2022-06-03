import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LoginViewDto } from 'src/app/models/login-view-dto';
import { AuthService } from 'src/app/services/Auths/auth.service';


@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss'],
  providers: [MessageService]
})
export class LoginHomeComponent implements OnInit {

  isBusy:boolean = false;
  user: LoginViewDto = new LoginViewDto("admin","admin");

  constructor(
    private router: Router, 
    private messageService: MessageService, 
    private primengConfig: PrimeNGConfig, private authService: AuthService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  login(){

    this.isBusy = true;  
    this.authService.login(this.user).subscribe(data=>{
    
      const token = (<any>data).token;
      const fullName = (<any>data).name + " " + (<any>data).surname;
      
      if((<any>data).token.length >= 0){
        localStorage.setItem("token", token);
        localStorage.setItem("user", fullName)
        setTimeout(() => {
          this.showSuccess("Login", "Success. Please wait...");
          this.isBusy = false;
          
          this.router.navigate(['home']);
        }, 2000);
      }else{
        this.showError("Login error", "Invaid user or password");
        setTimeout(()=> {
          this.isBusy = false;
          this.router.navigate(['login']);
        },2000);
      }
    }, err=>{
      console.log(err);
      setTimeout(() => {
        this.isBusy = true;
        this.showError("Login error", "Oops. An unknown error occurred.");
        this.router.navigate(['login']);
        this.isBusy = false;
      },2000);
    })
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
