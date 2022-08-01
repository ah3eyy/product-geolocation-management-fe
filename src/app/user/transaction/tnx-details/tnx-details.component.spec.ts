import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnxDetailsComponent } from './tnx-details.component';

describe('TnxDetailsComponent', () => {
  let component: TnxDetailsComponent;
  let fixture: ComponentFixture<TnxDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TnxDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TnxDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
