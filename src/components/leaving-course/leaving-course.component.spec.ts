import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavingCourseComponent } from './leaving-course.component';

describe('LeavingCourseComponent', () => {
  let component: LeavingCourseComponent;
  let fixture: ComponentFixture<LeavingCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeavingCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavingCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
