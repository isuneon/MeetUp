import { Component, OnInit} from '@angular/core';
import { SharedService } from "../../shared/services/shared.service";
import { trigger, state, style, transition, animate} from '@angular/animations';
import { MeetUpService } from '../../service/meetup.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    animations: [
        trigger('toggleHeight', [
            state('inactive', style({
                height: '0',
                opacity: '0'
            })),
            state('active', style({
                height: '*',
                opacity: '1'
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-out'))
        ])
    ]
}) 

export class NavigationComponent implements OnInit {
    public userInfo:any ={
        "name":"",
        "email":"",
        "id":"",
        "photo":{
            "thumb_link":""
        }
    };
    sidebarVisible: boolean;

    // Sub menu visibilities
    navigationSubState:any = {
        Tables: 'inactive',
        Forms: 'inactive',
        SamplePages: 'inactive',
        UserInterface: 'inactive',
        Components: 'inactive',
        Charts: 'inactive',
    };

    // Toggle sub menu
    toggleNavigationSub(menu, event) {
        event.preventDefault();
        this.navigationSubState[menu] = (this.navigationSubState[menu] === 'inactive' ? 'active' : 'inactive');
    }

    constructor(private sharedService: SharedService,
        private meetUpService: MeetUpService) {
        sharedService.sidebarVisibilitySubject.subscribe((value) => {
            this.sidebarVisible = value
        })
        var data = {"meetup_id":""}
        if(localStorage.getItem('id_meetup')!= null){
          data.meetup_id = localStorage.getItem('id_meetup');
        }else{
          this.meetUpService.logout();
        }
        this.meetUpService.getInfoUser(data).subscribe((data) => {
            this.userInfo = JSON.parse(data);
            console.log(JSON.parse(data));
            //console.log(info.id);
        
        },
          (err) => {
            this.meetUpService.logout();
            console.log(err);
        });

    }

    ngOnInit() {
    }
    logout(){
        this.meetUpService.logout();
    }
}
