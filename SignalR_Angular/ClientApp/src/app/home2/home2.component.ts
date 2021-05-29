import { Component, OnInit } from '@angular/core';
import {SignalrService} from "../signalr.service";

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {


  constructor(
    public signalrService: SignalrService
  ) { }

  ngOnInit(): void {
  }

}
