import { Component, OnInit,Input} from '@angular/core';
import { Http } from '@angular/http';
import { MeetUpService } from '../../../service/meetup.service'; 


@Component({
  selector: 'app-detail-groups',
  templateUrl: './detail-groups.component.html',
  styleUrls: ['./detail-groups.component.scss']
})

export class DetailGroupsComponent implements OnInit {
  @Input() groupID;
  group ={
    "description":"",
    "organizer":{
      "name":"",
      "photo":{
        "thumb_link":""
      }
    }
  };

  constructor(private http: Http,
                private meetUpService:MeetUpService) {
    
    
  }

  ngOnInit() {
    var data = {
      "meetup_id":null ,
      "group_id":null,
    }

    if(localStorage.getItem('id_meetup')!= null){
      data.meetup_id = localStorage.getItem('id_meetup');
      data.group_id = this.groupID;
    }else{
      this.meetUpService.logout();
    }
    this.meetUpService.getGroup(data).subscribe((data) => {
       
        this.group=data.results[0];

         console.log(this.group);
    },
      (err) => {
        this.meetUpService.logout();
    });
  }

  
  

  
}
