import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input() public players: Array<any>;
  public imutLifep: Array<number>;;

  constructor() {}

  checkLifeInPct(int, alt): number {
    let life = int, total = alt, pct;

    if (life == total) return 100;
    else {
      pct = (life * 100) / total;
      return pct.toFixed(2);
    }
  }

  calcAttack(hero){
    return Number(hero.powerstats.strength == "null" ? 50 : hero.powerstats.strength) +
    Number(hero.powerstats.power == "null" ? 50 : hero.powerstats.power) +
    Number(hero.powerstats.combat == "null" ? 50 : hero.powerstats.combat);
  }

  calcDefense(hero){
    return Number(hero.powerstats.intelligence == "null" ? 50 : hero.powerstats.intelligence) +
    Number(hero.powerstats.durability == "null" ? 50 : hero.powerstats.durability)
  }

  calcLife(player, pdefault, multiple): number{
    return (Number(player.intelligence == "null" ? pdefault : player.intelligence) + Number(player.strength == "null" ? pdefault : player.strength) + Number(player.speed == "null" ? pdefault : player.speed) + Number(player.durability == "null" ? pdefault : player.durability) + Number(player.power == "null" ? pdefault : player.power) + Number(player.combat == "null" ? pdefault : player.combat)) * multiple;
  }

  getHeroes():void {
    let p1 = this.players[0].powerstats;
    let p2 = this.players[1].powerstats;
    let el = <HTMLElement>document.querySelector('.box-message')

    // add life
    p1.life = this.calcLife(p1, 50, 3)
    p2.life = this.calcLife(p2, 50, 3)

    // calc life in %
    let l1 = p1.life;
    let l2 = p2.life;

    this.imutLifep = [l1, l2];

    p1.lifePct = this.checkLifeInPct(p1.life, l1);
    p2.lifePct = this.checkLifeInPct(p2.life, l2);

    el.classList.add('msg-appear')

    let someDied: Boolean = false;
    let fight = setInterval(()=>{
      if(this.players[0].powerstats.life > 0 && this.players[1].powerstats.life > 0){
        this.toAttack(this.players[0], this.players[1]);
        this.toAttack(this.players[1], this.players[0]);

        if(this.players[0].powerstats.life <= 0 || this.players[1].powerstats.life <= 0){
          someDied = true;
        }

        console.log('p1', this.players[0]);
        console.log('p2', this.players[1]);
      }
    }, 3500);

    if(someDied){
      clearInterval(fight)
    }

  }

  hasSupports(): Boolean {
    if (Math.floor(Math.random() * 2) + 1 === 1) {
      return true

    }else{
      return false;
    }
  }

  getRandomSupport(support): Array<any> {
    let supportsList = Object.keys(support);
    let rand = (Math.floor(Math.random() * supportsList.length) + 1) - 1;
    let arr = [supportsList[rand], support[supportsList[rand]]];

    return arr;
  }

  supportAttack(): Array<any> {
    let supportAtt: Object = {
      increaseAttack: 50,
      debuffDefense: 50
    };

    if (this.hasSupports()) return this.getRandomSupport(supportAtt);
  }

  supportDefense(): Array<any> {
    let supportDef: Object = {
      increaseDefense: 50,
      debuffAttack: 50,
      counterAttack: 10
    };

    if (this.hasSupports()) return this.getRandomSupport(supportDef);
  }

  calcSupport(heroAttacking, heroDefending, suppAtt, suppDef): Promise<number>{
    let ha = heroAttacking;
    let hd = heroDefending;

    ha.powerstats.attack = this.calcAttack(ha)
    hd.powerstats.attack = this.calcAttack(hd);

    ha.powerstats.defense = this.calcDefense(ha);
    hd.powerstats.defense = this.calcDefense(hd);

    [].slice.call(document.querySelectorAll('.attack span')).map((item, index)=> {
      item.innerHTML = this.players[index].powerstats.attack
    });

    [].slice.call(document.querySelectorAll('.defense span')).map((item, index)=> {
      item.innerHTML = this.players[index].powerstats.defense
    });

    // attack
    if(suppAtt){
      if(suppAtt[0] == 'increaseAttack'){
        ha.powerstats.attack = ha.powerstats.attack + (ha.powerstats.attack * (suppAtt[1]/100))

      }else if(suppAtt[0] == 'debuffDefense'){
        hd.powerstats.defense = hd.powerstats.defense - (hd.powerstats.defense * (suppAtt[1]/100))
      }
    }

    if(suppDef){
      if(suppDef[0] == 'increaseDefense'){
        hd.powerstats.defense = hd.powerstats.defense + (hd.powerstats.defense * (suppDef[1]/100))

      }else if(suppDef[0] == 'debuffAttack'){
        ha.powerstats.attack = ha.powerstats.attack - (ha.powerstats.attack * (suppDef[1]/100))

      }else if(suppDef[0] == 'counterAttack'){
        ha.powerstats.life = ha.powerstats.life - (ha.powerstats.attack * (suppDef[1]/100))

      }
    }

    let { attack } = heroAttacking.powerstats, { defense } = heroDefending.powerstats, damage;

    return new Promise((resolve, reject)=>{
      if(attack > defense){
        damage = attack;
      }else{
        damage = attack * 0.75;
      }
      resolve(damage);
    })
  }

  toAttack(heroAttacking, heroDefending) {
    let suppAtt: Array<any> = this.supportAttack();
    let suppDef: Array<any> = this.supportDefense();

    console.log(suppAtt ? `${heroAttacking.name} receive ${suppAtt[0]} of ${suppAtt[1]}%` : `${heroAttacking.name} receive no support for attack`);
    console.log(suppDef ? `${heroDefending.name} receive ${suppDef[0]} of ${suppDef[1]}%` : `${heroDefending.name} receive no support for defense`);

    let { life } = heroDefending.powerstats
    this.calcSupport(heroAttacking, heroDefending, suppAtt, suppDef)
      .then((damage)=>{

        if (damage > 0) heroDefending.powerstats.life = life - damage;
        console.log(`attack damage from ${heroAttacking.name}`, damage)
        console.log(`life left from ${heroDefending.name}`, heroDefending.powerstats.life);

        [].slice.call(document.querySelectorAll('.life-hero')).map((item, index)=> {
          let wdt = this.checkLifeInPct(this.players[index].powerstats.life, this.imutLifep[index]);
          item.style.width = wdt < 0 ? 0 + '%' : wdt + '%';
        });

        if(heroDefending.powerstats.life < 0) alert(`${heroDefending.name} died!`)
        return heroDefending.powerstats.life;
      })
  }


  battle(){
    let e = <HTMLElement>document.querySelector('.card');
    let el = [].slice.call(document.querySelectorAll('.player-info'));

    el.map((i)=>{ i.classList.add('rotate-card') })
    e.click();
  }

  ngOnInit() {}
}
