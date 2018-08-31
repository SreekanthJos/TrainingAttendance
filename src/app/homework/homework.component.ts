import { Component, OnInit } from '@angular/core';
import { HomeworkService } from '../services/homework.service';
import { EmpHomework } from '../models/attendance.model';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {
  homeworks: EmpHomework[];
  arhowrks:any[]=new Array();
  constructor(private hwService: HomeworkService) { }

  ngOnInit() {
    this.getHoweworks();
  }
  getHoweworks() {
    this.hwService.getEmployeeHomeworks().subscribe(res => {
      
      this.homeworks = res;
      for (var index = 0; index < this.homeworks.length; index++) {
        var hw = JSON.stringify(this.homeworks[index].Homeworks);
        JSON.parse(hw,(key,value)=>{
         if(key!="") this.arhowrks.push({"key":key,"value":value});
        })
        
      }
      console.log(this.arhowrks);
    });
  }

  updateHomework(emphw: EmpHomework) {
    this.hwService.saveEmpHomework(emphw);
  }
}
