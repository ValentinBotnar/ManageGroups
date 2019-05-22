import {Subgroup} from './subgroup';

export class Group{
     
    constructor(public id: number, public name: string, public description: string, public subgroups: Subgroup[]) { }
}