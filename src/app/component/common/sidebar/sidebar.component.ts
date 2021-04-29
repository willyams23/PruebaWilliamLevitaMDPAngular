import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() isTogged: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
    this.isTogged = false;
  }

  ngTogged(): void {
    this.isTogged = !this.isTogged;
  }


}
