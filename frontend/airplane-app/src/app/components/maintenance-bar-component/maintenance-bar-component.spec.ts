import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceBarComponent } from './maintenance-bar-component';

describe('MaintenanceBarComponent', () => {
  let component: MaintenanceBarComponent;
  let fixture: ComponentFixture<MaintenanceBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceBarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
