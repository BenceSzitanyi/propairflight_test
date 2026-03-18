import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneAddComponent } from './airplane-add-component';

describe('AirplaneAddComponent', () => {
  let component: AirplaneAddComponent;
  let fixture: ComponentFixture<AirplaneAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirplaneAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AirplaneAddComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
