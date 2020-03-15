import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss']
})
export class ButtonActionComponent implements OnInit {
  constructor() { }

  battleCards(){
    let card = new CardComponent();
    card.battle()
  }

  ngOnInit() {
  }

}
