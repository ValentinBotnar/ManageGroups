import {Input, Component, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms';
import {Group} from './classes/group';
import {Subgroup} from './classes/subgroup';
import {DataService} from './data.service';

@Component({
    selector: 'listGroups',
    template: 
    `<div class="groupList">
        <h1>List of groups</h1>
        <div *ngFor="let group of groupItems">
            <a role="button" (click)="showSubgroups(group.id)">{{group.name}}</a>
            <p *ngIf ="showSub[group.id]"> 
                <a *ngFor="let subgroup of subgroupItems">
                    <p class="subgroups" *ngIf =" subgroup.group.id == group.id && showSub[group.id] == true">
                        <a>{{subgroup.name}}</a>
                    </p>
                </a>
            </p>
            <p *ngIf ="!showSub[group.id]"> 
            </p>
        </div>
        <button class="btn btn-sm btn-primary" (click)="editGroup(p)">&#10000;</button>
        <button class="btn btn-sm btn-danger" (click)="delete(p)">&#10006;</button>
        <button class="btn btn-sm btn-norm" (click)="showSubgroups(p)">&#9776;</button>
    </div>
    <div class="editPanel">
        <p>
            <input type="name" class="form-control" [(ngModel)]="name" placeholder="Name" />
        </p>
        <p>
            <input type="description" class="form-control" [(ngModel)]="description" placeholder="Description" />
        </p>
        <p>
            <button class="btn btn-deleteGroup" >Delete</button>
            <button class="btn btn-saveGroup" (click)="saveGroup(name, description)">Save</button>
            <button class="btn btn-addGroup" (click)="addGroup(name, description)">Add</button>
        </p>
    </div>
    `,
    styles: [` 
            p,div{font-size:23px; font-family:Verdana;}
            .subgroups{font-size:20px; padding-left: 15px; }
            .groupList{float: left;}
            .editPanel{float: left; margin: 80px; }
            input{font-size:20px;}
            button{font-size:20px; margin-right: 10px;}
    `],
    providers: [DataService]
})
export class ListGroupsComponent implements OnInit { 

    showSub: boolean[] = [false];
    groupItems: Group[] = [];
    subgroupItems: Subgroup[] = [];
    groupCurrentId: number;
    subgroupCurrent: number;
    name: string;
    description: string;

    constructor(private dataService: DataService){}
     
    ngOnInit(){
        this.groupItems = this.dataService.getDataGroup();
        this.subgroupItems = this.dataService.getDataSubgroup();
    }

    showSubgroups(groupId: number){
        this.showSub[groupId] = !this.showSub[groupId];
        this.groupCurrentId = groupId;
        
        this.transferGroupToEditPanel(groupId);
    }

    addGroup(name: string, description: string){
        let currentGroup = this.groupItems.find(o => o.name == name);
        if(!currentGroup){
            this.dataService.addDataGroup(name, description);
        }
        else{
            alert("Group with this name already exists");
        }
       
    }

    saveGroup(name: string, description: string){
        
        if(name !="" && description != ""){
            this.groupItems[this.groupCurrentId].name = name;
            this.groupItems[this.groupCurrentId].description = description;
        }
        else{
            alert("Group with this name already exists");
        }
    }

    transferGroupToEditPanel(groupId: number){
        let currentGroup: Group;
        currentGroup = this.groupItems.find(o => o.id == groupId);
        this.name = currentGroup.name;
        this.description = currentGroup.description;
    }
}