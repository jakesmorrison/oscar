import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'

@Component({
    selector: 'lib-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user: any;
    
    constructor(
        private dataService: DataService,
    ) {}

    ngOnInit() {
        this.user = null;
    }

    login() {
        this.dataService.user = this.user;
        this.dataService.redirectTo('/main');
    }
}
