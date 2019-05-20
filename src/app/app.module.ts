import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { ListGroupsComponent } from './listGroups.component';
import { CreateGroupComponent } from './createGroup.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ AppComponent, ListGroupsComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }