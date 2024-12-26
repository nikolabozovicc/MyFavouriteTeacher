import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminComponent } from './admin/admin.component';
import { PassChangeComponent } from './pass-change/pass-change.component';
import { MyteachersComponent } from './myteachers/myteachers.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ClassesTeacherComponent } from './classes-teacher/classes-teacher.component';
import { MyStudentsComponent } from './my-students/my-students.component';
import { StudentClassesComponent } from './student-classes/student-classes.component';
import { ClassesStudentComponent } from './classes-student/classes-student.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DiagramsComponent } from './diagrams/diagrams.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "adminLogin", component: LoginAdminComponent},
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "student", component: StudentComponent},
  {path: "teacher", component: TeacherComponent},
  {path: "admin", component: AdminComponent},
  {path: "passChange", component: PassChangeComponent},
  {path: "myTeachers", component: MyteachersComponent},
  {path: "schedule", component: ScheduleComponent},
  {path: "classesTeacher", component: ClassesTeacherComponent},
  {path: "myStudents", component: MyStudentsComponent},
  {path: "studentClasses", component: StudentClassesComponent},
  {path: "classesStudent", component: ClassesStudentComponent},
  {path: "notifications", component: NotificationsComponent},
  {path: "diagrams", component: DiagramsComponent},
  {path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
