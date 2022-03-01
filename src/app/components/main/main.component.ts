import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'
declare let $: any; 
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'lib-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    name: any;
    currentIndex = 0;
    currentPosition = window.pageYOffset;
    pauseScrolling = false;
    userSelectionsWinner: any = {};
    userSelectionsFavorite: any = {};
    selectionEnabled = false;

    constructor(
        public dataService: DataService,
    ) { }

    ngOnInit() {
        $.scrollify({
            section : ".scroll-row",
            interstitialSection : "",
            easing: "easeOutExpo",
            scrollSpeed: 600,
            scrollbars: true,
            overflowScroll: true,
            updateHash: false,
            touchScroll:true
        });
        this.getData()
    };

    getData() {
        this.userSelectionsWinner = {};
        this.userSelectionsFavorite = {};    
        const url = `${this.dataService.baseUrl}api/getCurrentOscarOptions`;
        const params = {}
        this.dataService.get(url, params).subscribe( (d1: any) => {
            this.dataService.oscarOptions = d1;
            this.dataService.oscarCats = [...new Set( d1.map( (item: any) => item['Cat']))].sort().slice(0, 5);
            const url = `${this.dataService.baseUrl}api/getCurrentUserSelections`;
            const params = {'user': this.dataService.user};
            this.dataService.get(url, params).subscribe( (d2: any) => {
                this.dataService.userSelections = d2;
            })
        });
    }

    submitSelections() {
        for (const [key, value] of Object.entries(this.userSelectionsWinner)) {
            let v: any = value;
            this.userSelectionsWinner[key] = v.replace('$$WIN$$', '')
        }
        for (const [key, value] of Object.entries(this.userSelectionsFavorite)) {
            let v: any = value;
            this.userSelectionsFavorite[key] = v.replace('$$FAV$$', '')
        }
        console.log(this.userSelectionsWinner)
        console.log(this.userSelectionsFavorite)
    }

    radioChange() {
        this.userSelectionsWinner = JSON.parse(JSON.stringify(this.userSelectionsWinner))
        this.userSelectionsFavorite = JSON.parse(JSON.stringify(this.userSelectionsFavorite))
    }

    changeIndex(val: any) {
    }

}