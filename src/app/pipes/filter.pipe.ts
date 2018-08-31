import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Attendees } from '../models/attendance.model';

@Pipe({
  name: 'filtesr'
})
export class FilterPipe implements PipeTransform {

  transform(items: MatTableDataSource<Attendees>, searchText:string) {
   // console.log(items.filteredData);
    // console.log(searchText);
    // if(!items) return;
    // if(!searchText) return items;
    // searchText=searchText.toLowerCase();
    // console.log(items.filteredData);
    //  let res=items.filteredData.filter
    // (d=>{
    //   return d.Email.toLowerCase().includes(searchText)
    // });
    // console.log(items.filteredData);
    // items.filteredData=res;
   

  }

}
