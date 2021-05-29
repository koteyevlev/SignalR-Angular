import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignalrService} from "../signalr.service";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(
    public signalRService: SignalrService
  ) { }

  ngOnInit(): void {
    this.authMeListenerSuccess();
    this.authMeListenerFail();
  }

  ngOnDestroy(): void {
    this.signalRService.hubconnection.off("authMeResponseSuccess");
    this.signalRService.hubconnection.off("authMeResponseFail");
  }


  onSubmit(authForm: NgForm) {
    if (!authForm.valid)
      return;
    this.authMe(authForm.value.userName, authForm.value.password);
    authForm.reset();
  }

  async authMe(userName: string, password: string) {
    let personInfo = {userName: userName, password: password}
    await this.signalRService.hubconnection.invoke("AuthMe", personInfo)
      .then(() => {
        this.signalRService.toastr.info("Loging attempt...")
      })
      .catch(err => console.error(err))
  }

  private authMeListenerSuccess(){
    this.signalRService.hubconnection.on("authMeResponseSuccess", (personInfo: any) => {
      console.log(personInfo);
      this.signalRService.personName = personInfo.name;
      this.signalRService.toastr.success("Login Successful!");
      this.signalRService.router.navigateByUrl('/home2');
    })
  }

  private authMeListenerFail() {
    this.signalRService.hubconnection.on("authMeResponseFail", () => {
      this.signalRService.toastr.error("Wrong credentials")
    })
  }
}
