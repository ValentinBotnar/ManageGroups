import {Component} from '@angular/core';
import {NgModel} from '@angular/forms';
import {DataService} from './data.service';
 

 
@Component({
    selector: 'my-app',
    template: `<listGroups></listGroups>`,
    providers: [DataService]
})
export class AppComponent { }