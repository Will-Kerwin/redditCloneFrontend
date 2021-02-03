import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../post-model';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {VoteService} from '../vote.service';
import {AuthService} from '../../auth/shared/auth.service';
import {PostService} from '../post.service';
import {ToastrService} from 'ngx-toastr';
import {VotePayload} from './vote.payload';
import {VoteType} from './vote-type';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  votePayload: VotePayload;

  constructor(
    private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService,
    private toastr: ToastrService
  ) {
    this.votePayload = {
      voteType: undefined,
      postId: undefined
    };
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  downvotePost(): void {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  upvotePost(): void {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
  }

  private vote(): void {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateVoteDetails(): void {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }
}
