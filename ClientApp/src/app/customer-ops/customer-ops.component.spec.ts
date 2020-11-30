import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOpsComponent } from './customer-ops.component';

describe('CustomerOpsComponent', () => {
  let component: CustomerOpsComponent;
  let fixture: ComponentFixture<CustomerOpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
