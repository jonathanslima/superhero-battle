import { Component, OnInit } from '@angular/core';
import { retrieveData } from './services/herodata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [retrieveData]
})
export class AppComponent implements OnInit{
  public title:string = 'superhero-battle';
  public players: Array<object> = [];

  constructor(private retrieveData: retrieveData){}

  fillPlayers(){
    let p1Random = Math.floor(Math.random() * 731) + 1,
        p2Random = Math.floor(Math.random() * 731) + 1;

    this.retrieveData.getHeroInfo(p1Random).then(hero => { this.players.push(hero) })
    this.retrieveData.getHeroInfo(p2Random).then(hero => { this.players.push(hero) })
  }

  ngOnInit() {
    this.fillPlayers()
  }
}
