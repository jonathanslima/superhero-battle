import { Component, OnInit, Injectable } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss']
})

export class ButtonActionComponent implements OnInit {
  constructor() { }

  battleCards(){
    let el = <HTMLElement>document.querySelector('.button-actions');
    let card = new CardComponent();

    el.querySelector('.battle').classList.add('d-none');
    el.querySelector('.battle-again').classList.add('d-inline-block');
    el.querySelector('.new-battle').classList.add('d-inline-block');

    card.battle();
  }

  NewBattleCards(){
    location = location
  }

  ngOnInit() {
  }

}
