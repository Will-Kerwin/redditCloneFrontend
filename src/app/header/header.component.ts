import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
  }

  goToUserProfile(): void {
    this.router.navigateByUrl(`/user-profile/${this.username}`);
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }
}
