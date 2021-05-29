import { Injectable } from '@angular/core';
import * as signalr from '@aspnet/signalr';

@Injectable({ providedIn: 'root' })
export class SignalrService{
  constructor(
  ){}

  hubconnection:signalr.HubConnection;

  startConnection = () => {
    this.hubconnection = new signalr.HubConnectionBuilder()
      .withUrl('https://localhost:5001/toastr', {
        skipNegotiation: true,
        transport: signalr.HttpTransportType.WebSockets
      })
      .build()

    this.hubconnection
      .start()
      .then(() => {
        console.log("Hub connection started");
        this.askServerListener();
        this.askServer();
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  askServerListener() {
    console.log("Ask server Listener started");
    this.hubconnection.on("askServerResponse", (sometext) =>{
      console.log("Ask server Listener on");
      //this.toastr.success(sometext);
    })
  }

  async askServer() {
    console.log("Ask server started");
    await this.hubconnection.invoke("askServer", "hi")
      .then(() => {
        console.log("Ask server invoked");
      })
      .catch(err => console.error(err))
    console.log("This is a final prompt");
  }
}
