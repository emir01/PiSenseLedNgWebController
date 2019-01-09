import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedLightComponent } from './led-light.component';

describe('LedLightComponent', () => {
  let component: LedLightComponent;
  let fixture: ComponentFixture<LedLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
