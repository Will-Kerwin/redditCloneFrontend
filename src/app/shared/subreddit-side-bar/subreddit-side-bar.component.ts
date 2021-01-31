import {Component, OnInit} from '@angular/core';
import {SubredditService} from '../../subreddit/subreddit.service';
import {SubredditModel} from '../../subreddit/subreddit-response';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddits: Array<SubredditModel>;
  displayViewAll: boolean;

  constructor(private subredditService: SubredditService) {
    this.subredditService.getAllSubreddits().subscribe(data => {
      console.log(data);
      if (data.length >= 4) {
        // if more than 4 subreddits concat and adds display all button
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });
  }

  ngOnInit(): void {
  }

}