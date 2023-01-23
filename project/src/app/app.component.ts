import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this._setTheme();
  }

  public toggleTheme(): void {
    document.getElementsByTagName('body')[0].classList.toggle('dark-theme');

    if (document.getElementsByTagName('body')[0].classList.contains('dark-theme')) {
      localStorage.setItem('dark-theme', 'true');
    } else {
      localStorage.removeItem('dark-theme');
    }
  }

  private _setTheme(): void {
    if (localStorage.getItem('dark-theme') !== null) {
      document.getElementsByTagName('body')[0].classList.add('dark-theme');
    }
  }
}
