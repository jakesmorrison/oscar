import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { BehaviorSubject, Subject} from 'rxjs';
import { DataService } from '../../services/data.service'
// declare let $: any; 
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'lib-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
    // @ViewChild('mainScreen', {read: ElementRef}) elementView: ElementRef;
    
    name: any;
    currentIndex = 0;
    currentPosition = window.pageYOffset;
    pauseScrolling = false;
    userSelectionsWinner: any = {};
    userSelectionsFavorite: any = {};
    selectionEnabled = false;
    height: Subject<number> = new BehaviorSubject<number>(0)

    constructor(
        private elementRef:ElementRef,
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
        const navPadding = 40; // padding
        const element2 = dom.querySelectorAll('.title-div');
        const element3 = dom.querySelectorAll('.button-div');
        const footing = 50
        console.log(this.selectionEnabled)
        let allElements = 0;
        if (this.selectionEnabled == true) {
            console.log(element3[0].clientHeight)
            allElements = element1[0].clientHeight + element2[0].clientHeight + element3[0].clientHeight;
            this.height.next(window.innerHeight- allElements - navPadding - footing);

        } else {
            allElements = element1[0].clientHeight;
            this.height.next(window.innerHeight- allElements - navPadding - footing);
        }
    }

    selectionClick() {
        this.selectionEnabled = true
        this.calcHeight();
    }

    getData() {
        this.userSelectionsWinner = {};
        this.userSelectionsFavorite = {};    
        const url = `${this.dataService.baseUrl}api/getCurrentOscarOptions`;
        const params = {}
        this.dataService.get(url, params).subscribe( (d1: any) => {
            this.dataService.oscarOptions = d1;
            this.dataService.oscarCats = [...new Set( d1.map( (item: any) => item['Cat']))].sort();
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