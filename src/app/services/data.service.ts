import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DataService {
    user: any;
    constructor(private httpClient: HttpClient, 
        private router: Router,
        ) {
    }

    redirectTo(url: any) {
        this.router.navigate([url]);
    }
}