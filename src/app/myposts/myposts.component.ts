import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css'],
})
export class MypostsComponent implements OnInit {
  tweets: any[] = []; // Initialize an array to store tweets
  newComment: string = ''; // Add this line to define newComment

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Hardcoded user ID
    // const userId = 1019;
    const userId = localStorage.getItem('UserId')?.toString();
    console.log('User Id is ', userId);

    // Check if userId is available
    if (userId) {
      // Make an HTTP request to fetch tweets using the userId
      this.http
        .get(`http://localhost:53678/Api/Tweet/GetTweet?userid=${userId}`)
        .subscribe(
          (response: any) => {
            // Handle the successful response here
            console.log('Tweets:', response);

            // Assign the response data to the 'tweets' array
            this.tweets = response;
          },
          (error) => {
            // Handle errors here
            console.error('Error fetching tweets:', error);
          }
        );
    } else {
      // Handle the case where userId is not available
      console.error('User ID not found.');
    }
  }

  likeTweet(tweetId: number): void {
    // Implement your logic to handle the like functionality
    console.log(`Liked tweet with ID: ${tweetId}`);
  }

  addComment(tweetId: number, newComment: string): void {
    // Implement your logic to add a new comment
    console.log(`Added comment '${newComment}' to tweet with ID: ${tweetId}`);
  }
}
