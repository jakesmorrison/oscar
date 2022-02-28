import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'
declare let $: any; 

@Component({
    selector: 'lib-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    name: any;
    index = 0;
    currentPosition = window.pageYOffset;
    pauseScrolling = false;

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
    };
}
