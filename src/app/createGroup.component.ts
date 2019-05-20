import { Input, Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import {Group} from './classes/group';
import {Subgroup} from './classes/subgroup';
import{ListGroupsComponent} from './listGroups.component';

@Component({
    selector: 'createGroup',
    template: `<div class="correctGroups">
           
    <div class="form-group">
       
        <button class="btn btn-default" >Добавить</button>
 
             <p> a+{{groupCurrent}}+a </p>
           
    </div>`,
    providers: [DataService]
})
export class CreateGroupComponent implements OnInit { 
     
    @Input() groupCurrent: number;
    @Input() subgroupCurrent: number;
  //  constructor(private groupFromList: ListGroupsComponent){ }
   
    // public editGroup(){
    //     return this.groupFromList.transferGroupToEditPanel();
    // }

    ngOnInit(){
       // this.items = this.dataService.getData();
    }
}

// <input class="form-control" [(ngModel)]="name" placeholder = "Name" />
// <input type="number" class="form-control" [(ngModel)]="subscription" placeholder="Subscription" />