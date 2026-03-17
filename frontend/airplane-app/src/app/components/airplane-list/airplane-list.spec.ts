import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneList } from './airplane-list';

describe('AirplaneList', () => {
  let component: AirplaneList;
  let fixture: ComponentFixture<AirplaneList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirplaneList],
    }).compileComponents();

    fixture = TestBed.createComponent(AirplaneList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
