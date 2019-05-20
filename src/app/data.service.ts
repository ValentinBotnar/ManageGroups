import {Injectable} from '@angular/core';
import {Group} from './classes/group';
import {Subgroup} from './classes/subgroup';
 
@Injectable()
export class DataService{

    private dataGroup: Group[] = [
        { id: 0, name:'group1', description: 'descriptionGroup1'},
        { id: 1, name:'group2', description: 'descriptionGroup2'},
        { id: 2, name:'group3', description: 'descriptionGroup3'}
    ];
     
    private dataSubgroup: Subgroup[] = [
        {id: 0, name:'subgroup1', description: 'descriptionGroup1', group: this.dataGroup[0]},
        {id: 1, name:'subgroup2', description: 'descriptionGroup2', group: this.dataGroup[0]},
        {id: 2, name:'subgroup3', description: 'descriptionGroup3', group: this.dataGroup[0]},
        {id: 3, name:'subgroup4', description: 'descriptionGroup4', group: this.dataGroup[1]},
        {id: 4, name:'subgroup5', description: 'descriptionGroup5', group: this.dataGroup[1]},
        {id: 5, name:'subgroup6', description: 'descriptionGroup6', group: this.dataGroup[1]},
        {id: 6, name:'subgroup7', description: 'descriptionGroup7', group: this.dataGroup[2]},
        {id: 7, name:'subgroup8', description: 'descriptionGroup8', group: this.dataGroup[2]},
        {id: 8, name:'subgroup9', description: 'descriptionGroup9', group: this.dataGroup[2]}
    ];

    getDataGroup(): Group[] {
        return this.dataGroup;
    }
    getDataSubgroup(): Subgroup[] {
        return this.dataSubgroup;
    }

    addDataGroup(name: string, description: string){
      
        this.dataGroup.push(new Group(Math.random(), name, description));
    }
}