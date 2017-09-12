import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingdialogComponent } from './bookingdialog.component';

describe('BookingdialogComponent', () => {
  let component: BookingdialogComponent;
  let fixture: ComponentFixture<BookingdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
