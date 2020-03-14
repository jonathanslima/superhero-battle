import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input() public players: Array<any>;

  constructor() {}

  checkLifeInPct(int, alt) {
    let life = int,
      total = alt,
      pct;

    if (life == total) return 100;
    else {
      pct = (life * 100) / total;
      return pct.toFixed(2);
    }
  }

  battle(){
    this.getHeros()
  }

  getHeros() {
    let p1 = this.players[0].powerstats;
    let p2 = this.players[1].powerstats;
    let el = <HTMLElement>document.querySelector('.box-message')

    // add life
    p1.life =
      (Number(p1.intelligence == "null" ? 50 : p1.intelligence) +
        Number(p1.strength == "null" ? 50 : p1.strength) +
        Number(p1.speed == "null" ? 50 : p1.speed) +
        Number(p1.durability == "null" ? 50 : p1.durability) +
        Number(p1.power == "null" ? 50 : p1.power) +
        Number(p1.combat == "null" ? 50 : p1.combat)) *
      3;

    p2.life =
      (Number(p2.intelligence == "null" ? 50 : p2.intelligence) +
        Number(p2.strength == "null" ? 50 : p2.strength) +
        Number(p2.speed == "null" ? 50 : p2.speed) +
        Number(p2.durability == "null" ? 50 : p2.durability) +
        Number(p2.power == "null" ? 50 : p2.power) +
        Number(p2.combat == "null" ? 50 : p2.combat)) *
      3;

    let l1 = p1.life;
    let l2 = p2.life;

    p1.lifePct = this.checkLifeInPct(p1.life, l1);
    p2.lifePct = this.checkLifeInPct(p2.life, l2);

    console.log(this.players);

    el.classList.add('msg-appear')
  }

  ngOnInit() {}
}
