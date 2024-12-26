import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegistrationComponent } from './registration/registration.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PassChangeComponent } from './pass-change/pass-change.component';
import { MyteachersComponent } from './myteachers/myteachers.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ClassesTeacherComponent } from './classes-teacher/classes-teacher.component';
import { MyStudentsComponent } from './my-students/my-students.component';
import { StudentClassesComponent } from './student-classes/student-classes.component';
import { ClassesStudentComponent } from './classes-student/classes-student.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DiagramsComponent } from './diagrams/diagrams.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginAdminComponent,
    RegistrationComponent,
    StudentComponent,
    TeacherComponent,
    AdminComponent,
    HomeComponent,
    PassChangeComponent,
    MyteachersComponent,
    ScheduleComponent,
    ClassesTeacherComponent,
    MyStudentsComponent,
    StudentClassesComponent,
    ClassesStudentComponent,
    NotificationsComponent,
    DiagramsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
