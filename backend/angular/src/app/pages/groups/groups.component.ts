import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { MeetUpService } from '../../service/meetup.service';
import {Group} from '../../model/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {
  group:Group;
  rows:Array<any> = [];
  showDetail;
  dataGroupDetail;
  dataGroups;

  columns:Array<any> = [
    {
      title: 'ID',
      name: 'id'
    },
    {
      title: 'Nombre del Grupo',
      name: 'nombre'
    },
    {
      title: 'Direccion',
      name: 'direccion',
    },
    {
      title: 'Link',
      name: 'link'
    },
    {
      title: '# Miembros',
      name: 'cantidad_miembros'
    },
    {
      title: 'Opciones',
      name: 'observaciones'
    }
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
    this.showDetail = false;
    var data = {"meetup_id":""}
    if(localStorage.getItem('id_meetup')!= null){
      data.meetup_id = localStorage.getItem('id_meetup');
    }else{
      this.meetUpService.logout();
    }
    this.meetUpService.getUserGroups(data).subscribe((data) => {
        console.log(data);
        this.dataGroups = data;
        for(var i=0; i<data.length; i++){
            this.group=new Group();
            this.group.id = data[i].id;
            this.group.nombre = data[i].name;
            this.group.direccion = data[i].localized_location;
            this.group.link = data[i].link;
            this.group.cantidad_miembros = data[i].members;
            this.group.observaciones = '<button type="button" class="btn btn-primary">Ver mas</button>' ;
            this.rows.push(this.group);
        }
        this.data = this.rows;
    },
      (err) => {
        this.meetUpService.logout();
        console.log(err);
    });
    this.length = this.data.length;
  }

  ngOnInit() {
    this.onChangeTable(this.config);
  }
  showDetails1(){
    console.log("-.-");
  }
  showDetails(row){
    if(row.column === "observaciones"){
        this.dataGroupDetail = null;
        for(var i=0; i<this.dataGroups.length; i++){
            if(this.dataGroups[i].id === row.row.id){
              this.dataGroupDetail = this.dataGroups[i];
              break;
            }
        }
        console.log(this.dataGroupDetail);
        this.showDetail = true; 
    }
    
  }
  back(){
    this.showDetail = false; 
  }

  changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
          item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {

    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }
}
