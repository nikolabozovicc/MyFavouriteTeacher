import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesTeacherComponent } from './classes-teacher.component';

describe('ClassesTeacherComponent', () => {
  let component: ClassesTeacherComponent;
  let fixture: ComponentFixture<ClassesTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesTeacherComponent]
    });
    fixture = TestBed.createComponent(ClassesTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
