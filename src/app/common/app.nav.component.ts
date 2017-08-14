import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'app-left-navbar',
    templateUrl: 'app.nav.component.html',
    styleUrls: ['app.nav.component.scss']

})

export class LeftNavComponent implements OnInit{

    ngOnInit():void{

    }

    loggedIn(){}
    
    logout(){}
}