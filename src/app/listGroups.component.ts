import {Input, Component, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms';
import {Group} from './classes/group';
import {Subgroup} from './classes/subgroup';
import {DataService} from './data.service';

@Component({
    selector: 'listGroups',
    template: 
    `
    <div class="groupList">
        <h1>List of groups</h1>
        <div *ngFor="let group of groupItems">
            <a role="button" (click)="showSubgroups(group.id)">{{group.name}}</a>
            <button class="btn btn-addSubgroup" (click)="prepareforAddingSubgroup(group.id)">&#x2b;</button>
            <p *ngIf ="showSub[group.id]"> 
                <a *ngFor="let subgroup of subgroupItems">
                    <p class="subgroups" *ngIf =" subgroup.group.id == group.id && showSub[group.id] == true">
                        <a role="button" (click)="transferSubgroupToEditPanel(subgroup.id)">{{subgroup.name}}</a>
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
    <h1>Edit panel</h1>
        {{textOnEditingPanel}}
        <p>
            <input type="name" class="form-control" [(ngModel)]="name" placeholder="Name" />
        </p>
        <p>
            <input type="description" class="form-control" [(ngModel)]="description" placeholder="Description" />
        </p>
        <p>
            <button class="btn btn-deleteGroup" >Delete</button>
            <button class="btn btn-saveGroup" (click)="saveObject(name, description)">Save</button>
            <button class="btn btn-addGroup" (click)="add(name, description)">Add</button>
        </p>
    </div>
    `,
    styles: [` 
            p,div{font-size:23px; font-family:Verdana;}
            .subgroups{font-size:20px; padding-left: 15px; }
            .groupList{float: left;}
            .editPanel{float: left; margin-left: 200px; background-color: #fff; }
            input{font-size:20px;}
            button{font-size:20px; margin-right: 10px;}
            .btn-addSubgroup{margin-left:10px;}
            .checkbox{font-size: 16px;}
    `],
    providers: [DataService]
})
export class ListGroupsComponent implements OnInit { 

    showSub: boolean[] = [false];
    groupItems: Group[] = [];
    subgroupItems: Subgroup[] = [];
    groupCurrentId: number;
    subgroupCurrentId: number;
    name: string;
    description: string;
    editingObject: string;
    textOnEditingPanel: string;
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

    add(name: string, description: string){
        if(name !="" && description != ""){
            if(this.editingObject == "group"){
                let currentGroup = this.groupItems.find(o => o.name == name);
                let subgroups: Subgroup[] = [];
                if(!currentGroup){
                    this.dataService.addDataGroup(name, description, subgroups);
                }
                else{
                }
            }
            else if(this.editingObject == "createGroup"){
                let currentSubgroup = this.subgroupItems.find(o => o.name == name);
                if(!currentSubgroup){
                    this.dataService.addDataSubgroup(name, description, this.groupItems.find(o => o.id == this.groupCurrentId))
                }
                else{
                    alert("Subgroup with this name already exists");
                }
            }
        }
        else{
            alert("Fill all fields");
        }
    }

    prepareforAddingSubgroup(groupId: number){
        this.textOnEditingPanel = "Create subgroups for " + this.groupItems[groupId].name;
        this.name = "";
        this.description = "";

        this.editingObject = "createGroup";
        this.groupCurrentId = groupId;
    }

  

    saveObject(name: string, description: string){
        if(name !="" && description != ""){
            if(this.editingObject == "group"){
                this.groupItems[this.groupCurrentId].name = name;
                this.groupItems[this.groupCurrentId].description = description;
            }
            else if(this.editingObject == "subgroup"){
                this.subgroupItems[this.subgroupCurrentId].name = name;
                this.subgroupItems[this.subgroupCurrentId].description = description;
            }
        } 
        else{
            alert("Fill all fields");
        }
    }

    transferGroupToEditPanel(groupId: number){
        this.editingObject = "group";
        this.name = this.groupItems[groupId].name;
        this.description = this.groupItems[groupId].description;
        this.textOnEditingPanel = "";
    }

    transferSubgroupToEditPanel(subgroupId: number){
        this.subgroupCurrentId = subgroupId;
        this.editingObject = "subgroup";
        this.name = this.subgroupItems[subgroupId].name;
        this.description = this.subgroupItems[subgroupId].description;
        this.textOnEditingPanel = "";
    }
}