import { Component, OnInit } from '@angular/core';
import { HomeworkService } from '../services/homework.service';
import { EmpHomework, Homework, Employee } from '../models/attendance.model';
import { AttendanceService } from '../services/attendance.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-course-homeworks',
  templateUrl: './course-homeworks.component.html',
  styleUrls: ['./course-homeworks.component.css']
})
export class CourseHomeworksComponent implements OnInit {

  empHomeworks: EmpHomework[];
  homework: Homework;
  courseHomeworks: Homework[];
  employees: Employee[];
  step = 0;
  displayedColumns = ['SNO', 'Name', 'Description', 'Course']
  panelOpenState = false;
  courses: string[] = new Array<string>();
  dataSource;
  isAdmin=false;
  constructor(private hwService: HomeworkService, private atnService: AttendanceService,private loginService: LoginService) {
    this.homework = new Homework();
    this.isAdmin=this.loginService.isAdmin;
  }

  ngOnInit() {
    this.getCourses();
    this.getCourseHomeworks();
  }
  getCourses() {
    this.atnService.GetCourses().subscribe(data => {
      if (data.length > 0)
        this.courses = data[0].CourseName;
      console.log(this.courses);
    });
  }
  getCourseHomeworks() {
    this.hwService.getCourseHomeworks().subscribe(res => {

      this.courseHomeworks = res.filter((ch) => { if (ch.Name != "") return ch; });
      this.dataSource = new MatTableDataSource(this.courseHomeworks);
    });
  }
  assignHomework() {
    this.hwService.createHomework(this.homework).subscribe(res => {
      if (res) {
        let ar = this.empHomeworks;
        if (ar.length == 0) {
          this.employees.forEach(emp => {
            this.hwService.assignHomeworkToAttendees(emp, this.homework);
          })
        }
        else {
          // this.employees.forEach(emp => {
          this.empHomeworks.forEach(emphw => {
            //   if (emphw.Email.trim() != emp.Email.trim())
            this.hwService.updateHomwork(this.homework, emphw);
            // });
          })
        }
      }
    });
  
    this.getCourseHomeworks();
    console.log(this.homework);
  }
}
