import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallRequestComponent } from './getall-request.component';

describe('GetallRequestComponent', () => {
  let component: GetallRequestComponent;
  let fixture: ComponentFixture<GetallRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
