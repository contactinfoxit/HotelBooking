import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingreviewComponent } from './bookingreview.component';

describe('BookingreviewComponent', () => {
  let component: BookingreviewComponent;
  let fixture: ComponentFixture<BookingreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
