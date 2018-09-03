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
  //arhowrks:any[]=new Array();
  constructor(private hwService: HomeworkService) { }

  ngOnInit() {
    this.getHoweworks();
  }
  getHoweworks() {
    this.hwService.getEmployeeHomeworks().subscribe(res => {
      
      this.homeworks = res;
      for (var index = 0; index < this.homeworks.length; index++) {
        //this.homeworks[index].HwCollection=new Array();
        //var hw = JSON.stringify(this.homeworks[index].Homeworks);
        //JSON.parse(hw,(key,value)=>{
        // if(key!="") this.homeworks[index].HwCollection.push({"key":key,"value":value});
        //})
        
      }
     // console.log(this.arhowrks);
     console.log(this.homeworks[0].Hworks[0].name);
    });
  
  }

  updateHomework(emphw: EmpHomework) {

    //emphw.Homeworks=JSON.parse(JSON.stringify(emphw.HwCollection));
    console.log(emphw)
  //  this.hwService.saveEmpHomework(emphw);
  }
}
