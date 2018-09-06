export class Employee {
    Name: string;
    Email: string;
    Level: String;
    Course: string;
    IsPresent: boolean = false;
}

export class Attendees {
    Id: string;
    Name: string;
    Email: string;
    SessionDate: string;
    IsPresent: boolean = false;
    Course: String;
}

export class Homework {
    Id: string;
    Name: string;
    Description: string;
    Course: string;
}

export class EmpHomework {
    Id:string;
    Name: string;
    Email: string;     
    Hworks=new Array<any>();
    HomeworkStatus:string;
}
// export class HomeworkStatus{
// name:string;
// status:boolean;
// gitrepo:string;
// }