import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

interface Tweet {
  TweetID: number;
  Content: string;
  UserID: number;
  CreatedAt: string;
  Comments?: Comment[];
  showCommentBox?: boolean;
  newComment?: string;
}

interface Comment {
  CommentID: number;
  Content: string;
  UserID: number;
  CreatedAt: string;
  Comments?: Comment[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('shared', [
      state('unshared', style({ color: 'black' })), // Set the default color
      state('shared', style({ color: 'blue' })), // Set the color when shared
      transition('unshared => shared', animate('300ms ease-in')),
      transition('shared => unshared', animate('300ms ease-out')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  UserName: string = localStorage.getItem('UserName') ?? '';
  UserId = localStorage.getItem('UserId');
  tweetContent: string = '';
  commentContent: string = '';
  loading: boolean = false;
  tweets: Tweet[] = [];
  sortedTweets: any[] = [];
  profilePicture: string =
    localStorage.getItem('userProfileImage') ||
    'path/to/default-profile-image.jpg';
  likedTweets: Set<number> = new Set<number>();

  toggleCommentBox(tweet: Tweet): void {
    tweet.showCommentBox = !tweet.showCommentBox;
    tweet.newComment = ''; // Clear any previous comment when toggling
  }

  imageUrls: string[] = [
    'https://www.focus2move.com/wp-content/uploads/2020/01/Tesla-Roadster-2020-1024-03.jpg',
    'https://www.focus2move.com/wp-content/uploads/2023/10/Picture1.jpg',
    'https://www.focus2move.com/wp-content/uploads/2022/11/MG-4_EV-2023-800-02.jpg',
    'https://www.focus2move.com/wp-content/uploads/2020/05/close-up-of-gear-shift-over-black-background-248539-1068x731.jpg',
    'https://www.focus2move.com/wp-content/uploads/2023/02/The-2023-Toyota-Prius-XLE.jpeg',
    // Add more image URLs as needed
  ];

  // Randomly select an image URL
  randomImageUrl: string = this.getRandomImageUrl();

  // Function to get a random image URL from the array
  getRandomImageUrl(): string {
    const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
    return this.imageUrls[randomIndex];
  }

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Load initial data, you might want to call this in an appropriate lifecycle hook or event
    this.loadTweetContent();
  }

  logout(): void {
    this.router.navigate(['/logout']);
  }

  profile(): void {
    this.router.navigate(['/user-profile']);
  }

  tweet() {
    // Get the tweet content from the input field
    const tweetContent = (
      document.getElementById('tweetContent') as HTMLInputElement
    ).value;
    // Check if the tweet content is empty
    if (!tweetContent.trim()) {
      alert('Tweet content cannot be empty.');
      return;
    }

    // Get the UserId from localStorage
    const userId = localStorage.getItem('UserId');

    // You should replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    const apiEndpoint = 'http://localhost:53678/Api/Tweet/createtweet';
    this.loading = true;

    // Make the API call
    this.http
      .post(apiEndpoint, { content: tweetContent, userId: userId })
      .subscribe(
        (response) => {
          console.log('Tweet created successfully:', response);

          // Show an alert
          alert('Tweet added successfully!');
          //const TweetID = response[0].TweetID; // Access the TweetID from the first tweet in the array
          // localStorage.setItem('TweetID', response.TweetID);
          // Clear the input field
          (document.getElementById('tweetContent') as HTMLInputElement).value =
            '';

          // Reload the current route to refresh the page
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);
        },
        (error) => {
          console.error('Error creating tweet:', error);

          // Optionally, you can handle the error here
        }
      )
      .add(() => {
        // Set loading state to false when the request is complete
        this.loading = false;
      });
  }

  loadTweetContent() {
    // Get the UserId from localStorage
    const userId = localStorage.getItem('UserId');

    // You should replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    const apiEndpoint = `http://localhost:53678/Api/Tweet/GetTweet?userid=${userId}`;
    this.loading = true;

    // Make the API call
    this.http
      .get<Tweet[]>(apiEndpoint)
      .subscribe(
        (response) => {
          // Assuming the API response has a property 'tweetContent'
          this.tweets = response;

          // Sort the tweets based on the 'CreatedAt' property
          this.sortedTweets = response.sort((a, b) => {
            return (
              new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
            );
          });
        },
        (error) => {
          console.error('Error fetching tweet content:', error);
          // Optionally, you can handle the error here
        }
      )
      .add(() => {
        // Set loading state to false when the request is complete
        this.loading = false;
      });
  }
  commentAdded: boolean = false;

  addComment(tweet: Tweet) {
    // Check if the comment content is empty
    if (!this.commentContent.trim()) {
      alert('Comment content cannot be empty.');
      return;
    }

    // Get the UserId from localStorage
    const userId = localStorage.getItem('UserId');

    // You should replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    const apiEndpoint = 'http://localhost:53678/Api/Tweet/comment';
    this.loading = true;
    this.commentAdded = true;

    // Make the API call to add a comment
    this.http
      .post<Comment[]>(apiEndpoint, {
        tweetId: tweet.TweetID,
        content: this.commentContent,
        userId: userId,
      })
      .subscribe(
        (response) => {
          console.log('Comment added successfully:', response);
          alert('Comment added successfully');

          // Clear the comment input field
          this.commentContent = '';

          // Fetch the updated comments separately
          this.loadTweetContent();
        },
        (error) => {
          console.error('Error adding comment:', error);

          // Optionally, you can handle the error here
        }
      )
      .add(() => {
        // Set loading state to false when the request is complete
        this.loading = false;
      });
  }
  likedState: string = 'unliked';

  toggleLike(tweet: Tweet): void {
    if (this.likedTweets.has(tweet.TweetID)) {
      this.likedTweets.delete(tweet.TweetID);
    } else {
      this.likedTweets.add(tweet.TweetID);
    }
    const requestBody = {
      userid: this.UserId,
      tweetid: tweet.TweetID,
    };
    this.http
      .post('http://localhost:53678/Api/Tweet/like', requestBody)
      .subscribe(
        (response) => {
          console.log('Liked successfully:', response);
          alert('Tweet liked :)');
        },
        (error) => {
          console.error('Error while liking the tweet:', error);
        }
      );
  }
  retweet(tweetId: string) {
    // Call the retweet API

    const apiUrl = 'http://localhost:53678/Api/Tweet/retweet';

    // Assuming you have userId and tweetId available
    const requestBody = {
      userid: '1016', // Replace with the actual user ID
      tweetid: tweetId,
    };

    this.http.post(apiUrl, requestBody).subscribe(
      (response) => {
        console.log('Retweet successful', response);
        alert('Tweet shared successful!');

        // You can perform additional actions after a successful retweet
      },
      (error) => {
        console.error('Error during retweet', error);
        // Handle error scenarios
      }
    );
  }

  isFollowing: { [key: string]: boolean } = {};

  followClicked(username: string) {
    if (this.isFollowing[username]) {
      alert(`You are already following ${username}!`);
    } else {
      this.isFollowing[username] = true;
      alert(`You are now following ${username}!`);
      // You can perform additional actions related to following here
    }
  }

  // Function to fetch comments separately after adding a new comment
}
