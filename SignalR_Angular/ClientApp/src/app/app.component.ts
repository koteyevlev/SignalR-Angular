import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignalrService} from "./signalr.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(public signalrService: SignalrService) {
  }

  ngOnInit() {
    this.signalrService.startConnection();
     setTimeout(() => {
       this.signalrService.askServerListener();
       this.signalrService.askServer();
     }, 2000)
  }

  ngOnDestroy(): void {
    this.signalrService.hubconnection.off("askServerResponse");
  }

}
