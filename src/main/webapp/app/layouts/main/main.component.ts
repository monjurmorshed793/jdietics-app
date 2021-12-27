import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  showFilter = false;
  isScreenSmall?: boolean;

  constructor(
    private accountService: AccountService,
    private titleService: Title,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    // try to log in automatically
    this.accountService.identity().subscribe();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
    });

    // first check whether the user is logged in, if logged in, then check the screen size.
    this.accountService.getAuthenticationState().subscribe(res => {
      this.isScreenSmall = true;
      // eslint-disable-next-line no-console
      console.log(res);
      // eslint-disable-next-line no-console
      console.log(this.isScreenSmall);
      if (res) {
        this.breakpointObserver.observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`]).subscribe((state: BreakpointState) => {
          this.isScreenSmall = state.matches;
        });
      }

      // eslint-disable-next-line no-console
      console.log(this.isScreenSmall);
    });
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    const title: string = routeSnapshot.data['pageTitle'] ?? '';
    if (routeSnapshot.firstChild) {
      return this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'Jdietics';
    }
    this.titleService.setTitle(pageTitle);
  }
}
