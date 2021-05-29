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
        console.log('Hub Connection Started!')
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  askServerListener() {
    this.hubconnection.on("askServerResponse", (sometext) =>{
      console.log(sometext)
    })
  }

  askServer() {
    this.hubconnection.invoke("askServer", "hi")
      .catch(err => console.error(err))
  }
}
