import { Component, OnInit } from '@angular/core';
import { HomeworkService } from '../services/homework.service';
import { EmpHomework, Homework, Employee } from '../models/attendance.model';
import { AttendanceService } from '../services/attendance.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {
  empHomeworks: EmpHomework[];
  homework: Homework;
  courseHomeworks: Homework[];
  employees: Employee[];
  step = 0;
  displayedColumns = ['SNO', 'Name', 'Description', 'Course']
  panelOpenState = false;
  courses: string[] = new Array<string>();
  dataSource;
  constructor(private hwService: HomeworkService, private atnService: AttendanceService) {
    this.homework = new Homework();
  }

  ngOnInit() {
    this.getHoweworks();
    this.getCourses();
    this.getEmployees();
    this.getCourseHoweworks();
  }
  getEmployees() {
    this.atnService.GetAttendeesListForTraining().subscribe(res => {
      this.employees = res;
    });
  }
  getHoweworks() {
    this.hwService.getEmployeeHomeworks().subscribe(res => {

      this.empHomeworks = res;
      this.empHomeworks = this.empHomeworks.filter(emp => { if (emp.Name != "") { return emp; } })
    });

  }
  getCourseHoweworks() {
    this.hwService.getCourseHomeworks().subscribe(res => {

      this.courseHomeworks = res.filter((ch) => { if (ch.Name != "") return ch; });
      this.dataSource = new MatTableDataSource(this.courseHomeworks);
    });

  }
  getCourses() {
    this.atnService.GetCourses().subscribe(data => {
      if (data.length > 0)
        this.courses = data[0].CourseName;
      console.log(this.courses);
    });
  }
  updateHomework(emphw: EmpHomework) {

    //emphw.Homeworks=JSON.parse(JSON.stringify(emphw.HwCollection));
    console.log(emphw)
    //  this.hwService.saveEmpHomework(emphw);
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
    this.getHoweworks();
    this.getCourseHoweworks();
    console.log(this.homework);
  }

  saveEmpHomework(emphw: EmpHomework) {
    this.hwService.saveEmpHomework(emphw);
  }
  setStep(index: number) {
    this.step = index;
  }
}
