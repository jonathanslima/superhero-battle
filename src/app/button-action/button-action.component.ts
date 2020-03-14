import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss']
})
export class ButtonActionComponent implements OnInit {
  public card = new CardComponent();

  constructor() { }

  battle(){
    this.card.battle()
  }

  ngOnInit() {
  }

}
