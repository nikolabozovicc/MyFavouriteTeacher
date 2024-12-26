import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyteachersComponent } from './myteachers.component';

describe('MyteachersComponent', () => {
  let component: MyteachersComponent;
  let fixture: ComponentFixture<MyteachersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyteachersComponent]
    });
    fixture = TestBed.createComponent(MyteachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
