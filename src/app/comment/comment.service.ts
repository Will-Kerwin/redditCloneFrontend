import { Injectable } from '@angular/core';
import {CommentPayload} from './comment.payload';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/comments', commentPayload);
  }

  getAllCommentsForPost(postId: string): Observable<Array<CommentPayload>> {
    return this.http.get<Array<CommentPayload>>(`http://localhost:8080/api/comments/by-post/${postId}`);
  }

  getAllCommentsByUser(name: string): Observable<Array<CommentPayload>> {
    return this.http.get<Array<CommentPayload>>(`http://localhost:8080/api/comments/by-user/${name}`);
  }
}
