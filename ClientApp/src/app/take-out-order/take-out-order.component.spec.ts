import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeOutOrderComponent } from './take-out-order.component';

describe('TakeOutOrderComponent', () => {
  let component: TakeOutOrderComponent;
  let fixture: ComponentFixture<TakeOutOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeOutOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeOutOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
