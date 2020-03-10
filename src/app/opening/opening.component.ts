import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.scss']
})
export class OpeningComponent implements OnInit {
  public percentage :number = 0;
  constructor() { }

  ngOnInit() {
    let el:Element = <HTMLElement>document.querySelector('.opening');
    let fillProgressBar = setInterval(():void => {
      this.percentage = this.percentage + 50;
      if(this.percentage == 100){
        clearInterval(fillProgressBar)
        setTimeout(()=> { el.classList.add('opening-out') }, 1000)
      }
    }, 1000)
  }
}
