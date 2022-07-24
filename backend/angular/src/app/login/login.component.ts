import { Component, OnInit } from '@angular/core';
import { BaseApiService } from '../service/base_api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public idMeetUp:any;
  constructor(private baseApiService:BaseApiService,
            private route: ActivatedRoute,
            private router: Router) {
    this.route.params.subscribe(params => {
      this.idMeetUp= params['id_meetup'];
      if(this.idMeetUp){
        localStorage.setItem("id_meetup", this.idMeetUp);
        this.router.navigate(['/']);
      }
      console.log(this.idMeetUp);

    });
  }

  ngOnInit() {
  }

  loginMeetup(){
  	console.log("login Meetup");
  	window.open(this.baseApiService.url_backend,'_self');
  } 

}
