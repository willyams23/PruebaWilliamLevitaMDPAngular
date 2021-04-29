import { Component, OnInit } from '@angular/core';
import { HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    // Begin Top
    collapsedSidebar: boolean = false;

    isShow: boolean = false;
    topPosToStartShowing = 100;
    @HostListener('window:scroll')
    checkScroll() {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollPosition >= this.topPosToStartShowing) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
    // End Top

  constructor() { }

  ngOnInit(): void {
  }

   /*
  receiveCollapsed($event) {
    this.collapsedSidebar = $event;
  } */

    // Begin Top
    ngGoTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    // End Top

}
