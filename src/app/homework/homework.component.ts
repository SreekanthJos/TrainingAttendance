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
    this.getEmployees();

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
  saveEmpHomework(emphw: EmpHomework) {
    this.hwService.saveEmpHomework(emphw);
  }
  setStep(index: number) {
    this.step = index;
  }
}
