import { Component, OnInit } from '@angular/core';
import { HomeworkService } from '../services/homework.service';
import { EmpHomework, Homework, Employee } from '../models/attendance.model';
import { AttendanceService } from '../services/attendance.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { LoginService } from '../services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-course-homeworks',
  templateUrl: './course-homeworks.component.html',
  styleUrls: ['./course-homeworks.component.css']
})
export class CourseHomeworksComponent implements OnInit {

  empHomeworks: EmpHomework[] = new Array<EmpHomework>();
  homework: Homework;
  courseHomeworks: Homework[];
  employees: Employee[];
  step = 0;
  displayedColumns = ['SNO', 'Name', 'Description', 'Course', 'Options']
  panelOpenState = false;
  courses: string[] = new Array<string>();
  dataSource;
  isAdmin = false;
  constructor(private hwService: HomeworkService, private atnService: AttendanceService, private loginService: LoginService) {
    this.homework = new Homework();
    this.isAdmin = this.loginService.isAdmin;
  }

  ngOnInit() {
    this.getCourses();
    this.getCourseHomeworks();
    this.getEmployees();
  }

  getEmployees() {
    this.atnService.GetAttendeesListForTraining().subscribe(res => {
      this.employees = res;
    });
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

  assignHomework(homework: Homework) {
    console.log(homework);
    debugger;
    if (this.empHomeworks.length == 0) {
    this.hwService.getEmployeeHomeworks().subscribe(res => {
      this.empHomeworks = res as EmpHomework[];
     // this.empHomeworks = this.empHomeworks.filter(emp => { if (emp.Name != "") { return emp; } })
      if (this.empHomeworks.length === 1) {
        this.employees.forEach(emp => {
          this.hwService.assignHomeworkToAttendees(emp, homework);
        });
      }
      else {
      //  this.empHomeworks = res as EmpHomework[];
      this.empHomeworks = this.empHomeworks.filter(emp => { if (emp.Name != "") { return emp; } });
        this.empHomeworks.forEach(emphw => {
          this.hwService.updateHomework(homework, emphw);
        })
      }
    });
  }
}

  createHomework() {
    this.hwService.createHomework(this.homework).subscribe(res => {

    });

    this.getCourseHomeworks();
    //this.homework=new Homework();
  }
}
