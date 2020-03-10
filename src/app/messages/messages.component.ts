import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public message : string;
  public fight: string = 'FIGHT!';
  public winner: string = 'PLAYER 1 WIN';

  constructor() { }

  ngOnInit() {
    this.message = this.fight;
  }

}
