import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-battle-box',
  templateUrl: './battle-box.component.html',
  styleUrls: ['./battle-box.component.scss']
})
export class BattleBoxComponent implements OnInit {
  @Input() public statusFight: Array<string>;

  constructor() { }

  ngOnInit() {

  }

}
