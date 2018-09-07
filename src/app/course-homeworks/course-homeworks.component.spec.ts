import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseHomeworksComponent } from './course-homeworks.component';

describe('CourseHomeworksComponent', () => {
  let component: CourseHomeworksComponent;
  let fixture: ComponentFixture<CourseHomeworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseHomeworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseHomeworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
