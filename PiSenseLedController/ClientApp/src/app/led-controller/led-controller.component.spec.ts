import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedControllerComponent } from './led-controller.component';

describe('LedControllerComponent', () => {
  let component: LedControllerComponent;
  let fixture: ComponentFixture<LedControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
