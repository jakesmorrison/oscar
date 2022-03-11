import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DataService {
    baseUrl = 'http://localhost:5000/'
    // baseUrl = 'http://137.184.112.158:5000/'
    user: any;
    userSelections: any = [];
    oscarOptions: any = [];
    oscarCats: any = [];

    constructor(private httpClient: HttpClient, 
        private router: Router,
        ) {
    }

    redirectTo(url: any) {
        this.router.navigate([url]);
    }

    get(url: any, params: any) {
        return this.httpClient.get(url, {params})
    }

    post(url: any, body: any) {
        return this.httpClient.post(url, body)
    }

}