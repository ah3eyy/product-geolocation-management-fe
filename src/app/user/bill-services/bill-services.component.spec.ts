import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillServicesComponent } from './bill-services.component';

describe('BillServicesComponent', () => {
  let component: BillServicesComponent;
  let fixture: ComponentFixture<BillServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
