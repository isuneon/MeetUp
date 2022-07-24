import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { GroupsComponent } from './groups.component';
import { DetailGroupsComponent } from './detail-groups/detail-groups.component';
import { CommentsGroupsComponent } from './detail-groups/comments-groups/comments-groups.component';
import { MembersGroupsComponent } from './detail-groups/members-groups/members-groups.component';
import { RatingComponent } from '../../component/rating/rating.component';


const GROUPS_ROUTES: Routes = [
    { path: '', component: GroupsComponent }
];

@NgModule ({
    declarations: [
        GroupsComponent,
        DetailGroupsComponent,
        CommentsGroupsComponent,
        MembersGroupsComponent,
        RatingComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PaginationModule.forRoot(),
        Ng2TableModule,
        RouterModule.forChild(GROUPS_ROUTES),
        TabsModule.forRoot(),
    ]
})

export class GroupsModule { }