import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleBoxComponent } from './battle-box.component';

describe('BattleBoxComponent', () => {
  let component: BattleBoxComponent;
  let fixture: ComponentFixture<BattleBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
