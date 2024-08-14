import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapprovedBookingsComponent } from './unapproved-bookings.component';

describe('UnapprovedBookingsComponent', () => {
  let component: UnapprovedBookingsComponent;
  let fixture: ComponentFixture<UnapprovedBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnapprovedBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnapprovedBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
