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

  faUser = faUser;
  isLoggedIn: boolean;
  username: string;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  goToUserProfile(): void {
    this.router.navigateByUrl(`/user-profile/${this.username}`);
  }
}
