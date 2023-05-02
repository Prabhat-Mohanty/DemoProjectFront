import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOrderedComponent } from './book-ordered.component';

describe('BookOrderedComponent', () => {
  let component: BookOrderedComponent;
  let fixture: ComponentFixture<BookOrderedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookOrderedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookOrderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
