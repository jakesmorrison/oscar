import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DataService } from '../../services/data.service'
import { lastValueFrom } from 'rxjs';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
// declare let $: any; 
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

interface ITab {
    title: string;
    active: boolean;
}

@Component({
    selector: 'lib-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
    loading = true;
    name: any;
    currentIndex = 0;
    currentPosition = window.pageYOffset;
    pauseScrolling = false;
    userSelectionsWinner: any = {};
    userSelectionsFavorite: any = {};
    selectionEnabled = false;
    height: Subject<number> = new BehaviorSubject<number>(0)
    userPicks: any = [];
    winners: any = [];
    favorite: any = [];
    leaderboard: any = [];
    tabs: ITab[] = []
    tabs1: ITab[] = [
        { title: 'Selection', active: true },
        { title: 'Leaderboard', active: false },
        { title: 'Winners', active: false },
        { title: 'Favorites', active: false }
    ];
    tabs2: ITab[] = [
        { title: 'Picks', active: true },
        { title: 'Leaderboard', active: false },
        { title: 'Winners', active: false },
        { title: 'Favorites', active: false }
    ];
    constructor(
        private elementRef: ElementRef,
        public dataService: DataService,
        private cdref: ChangeDetectorRef
    ) {
    }
    ngOnInit() {
        // $.scrollify({
        //     section : ".scroll-row",
        //     interstitialSection : "",
        //     easing: "easeOutExpo",
        //     scrollSpeed: 1000,
        //     scrollbars: true,
        //     overflowScroll: true,
        //     updateHash: false,
        //     touchScroll:true
        // });
        this.getData()
    };

    ngAfterViewInit() {
        this.calcHeight();
        this.cdref.detectChanges();
    }

    calcHeight() {
        this.cdref.detectChanges();
        const dom: HTMLElement = this.elementRef.nativeElement;
        const element1 = dom.querySelectorAll('.nav-pills'); // nav
        const navPadding = 50; // padding
        const element2 = dom.querySelectorAll('.title-div');
        const element3 = dom.querySelectorAll('.button-div');
        const footing = 50
        let allElements = 0;
        try {
            if (this.selectionEnabled == true) {
                allElements = element1[0].clientHeight + element2[0].clientHeight + element3[0].clientHeight;
                this.height.next(window.innerHeight - allElements - navPadding - footing);
            } else {
                allElements = element1[0].clientHeight;
                this.height.next(window.innerHeight - allElements - navPadding - footing);
            }    
        } catch (e) {
            this.height.next(100)
        }
    }

    selectionClick() {
        this.selectionEnabled = true
        this.calcHeight();
    }

    async getData() {
        this.loading = true;

        const allPromises = [this.getOscarOptions(), this.getUserSelections(), this.getWinners(), this.getLeaderboard(), this.getFavorite()];
        const res = await Promise.all(allPromises)
        this.loading=false

        if (res.length == 5) {
            // Oscar Options
            this.dataService.oscarOptions = res[0];
            this.dataService.oscarCats = [...new Set(this.dataService.oscarOptions.map((item: any) => item['Cat']))].sort()//.slice(0, 5);

            // Get User 
            this.userPicks = res[1];

            // Get Winners 
            this.winners = res[2];

            // Get Winners 
            this.leaderboard = res[3];

            // Get Favorite
            console.log(res[4])
            this.favorite = res[4];


            if (this.userPicks.length == 0) this.tabs = this.tabs1;
            else this.tabs = this.tabs2;

            this.calcHeight();
            this.cdref.detectChanges();
        }

    }

    getOscarOptions() {
        this.userSelectionsWinner = {};
        this.userSelectionsFavorite = {};
        const url = `${this.dataService.baseUrl}api/getCurrentOscarOptions`;
        const params = {}
        return lastValueFrom(this.dataService.get(url, params))
    }

    getUserSelections() {
        const url = `${this.dataService.baseUrl}api/getCurrentUserSelections`;
        const params = { 'user': this.dataService.user };
        return lastValueFrom(this.dataService.get(url, params))
        // ( (d2: any) => {
        //     this.dataService.userSelections = d2;
        // })
    }

    getWinners() {
        const url = `${this.dataService.baseUrl}api/getWinners`;
        const params = {};
        return lastValueFrom(this.dataService.get(url, params))
    }

    getLeaderboard() {
        const url = `${this.dataService.baseUrl}api/getLeaderboard`;
        const params = {};
        return lastValueFrom(this.dataService.get(url, params))
    }

    getFavorite() {
        const url = `${this.dataService.baseUrl}api/getFavorite`;
        const params = {};
        return lastValueFrom(this.dataService.get(url, params))
    }


    postSelections() {
        for (const [key, value] of Object.entries(this.userSelectionsWinner)) {
            let v: any = value;
            this.userSelectionsWinner[key] = v.replace('$$WIN$$', '')
        }
        for (const [key, value] of Object.entries(this.userSelectionsFavorite)) {
            let v: any = value;
            this.userSelectionsFavorite[key] = v.replace('$$FAV$$', '')
        }
        const url = `${this.dataService.baseUrl}api/setCurrentUserSelections`;
        const body = { 'user': this.dataService.user, 'win': this.userSelectionsWinner, 'fav': this.userSelectionsFavorite };
        this.dataService.post(url, body).subscribe((d2: any) => {
            alert('Data Has Been Submitted');
            this.getData();
        }, (error) => {
            console.log(error)
            alert('Submission Error');
        })
    }

    radioChange(cat: any, i: number) {
        this.userSelectionsWinner = JSON.parse(JSON.stringify(this.userSelectionsWinner));
        this.userSelectionsFavorite = JSON.parse(JSON.stringify(this.userSelectionsFavorite));
        if (this.userSelectionsWinner.hasOwnProperty(cat) && this.userSelectionsWinner[cat] != null &&
            this.userSelectionsFavorite.hasOwnProperty(cat) && this.userSelectionsFavorite[cat] != null) {
            if (i < this.dataService.oscarCats.length - 1) {
                setTimeout(() => { this.currentIndex = this.currentIndex + 1 }, 300)
            }
        }
    }

    changeIndex(val: any) {
    }

    refreshData() {
        this.getData()
    }

}