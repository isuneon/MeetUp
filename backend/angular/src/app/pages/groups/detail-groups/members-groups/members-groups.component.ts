import { Component, OnInit,Input} from '@angular/core';
import { Http } from '@angular/http';
import { MeetUpService } from '../../../../service/meetup.service';

@Component({
  selector: 'app-members-groups',
  templateUrl: './members-groups.component.html',
  styleUrls: ['./members-groups.component.scss']
})

export class MembersGroupsComponent implements OnInit {
  @Input() groupID;
  rows:Array<any> = [];
  members;
  meta;

  columns:Array<any> = [
  ];
  page:number = 1;
  itemsPerPage:number = 10;
  maxSize:number = 5;
  numPages:number = 1;
  length:number = 0;
  data:Array<any> = this.rows;

  config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-bordered']
  };

  constructor(private http: Http,
                private meetUpService:MeetUpService) {
    
    
  }

  ngOnInit() {
    this.onChangeTable(this.config);
    console.log(this.groupID);
  }

  onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {

    var data = {
      "meetup_id":null ,
      "group_id":null,
      "member_page":null,
      "number_page":null,
    }
    if(localStorage.getItem('id_meetup')!= null){
      data.meetup_id = localStorage.getItem('id_meetup');
      data.member_page = page.itemsPerPage;
      data.number_page = (page.page*1) - 1;
      data.group_id = this.groupID;
    }else{
      this.meetUpService.logout();
    }
    this.meetUpService.getMembersGroups(data).subscribe((data) => {
        this.members=data.results;
        this.meta=data.meta;

        if (config.filtering) {
          (<any>Object).assign(this.config.filtering, config.filtering);
        }

        if (config.sorting) {
          (<any>Object).assign(this.config.sorting, config.sorting);
        }
        this.length = this.meta.total_count;
    },
      (err) => {
        this.meetUpService.logout();
    });

    

    //this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    //this.length = sortedData.length;
  }
  

  
}
