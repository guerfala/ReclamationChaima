import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from 'src/app/models/feedback';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-feedbacks',
  templateUrl: './user-feedbacks.component.html',
  styleUrls: ['./user-feedbacks.component.css']
})
export class UserFeedbacksComponent implements OnInit {
  feedbacks: Feedback[] = [];
  newNote: string = '';
  selectedFeedback: Feedback | null = null;
  updatedNote: string = '';
  userId: number | null = null;

  constructor(
    private feedbackService: FeedbackService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    if (this.userId) {
        this.loadUserFeedbacks(this.userId);
    } else {
        console.warn("User ID is not set! Cannot load feedbacks.");
    }
  }

  loadUserFeedbacks(userId: number) {
    console.log("Fetching feedbacks for user ID:", userId);
    this.feedbackService.getUserFeedbacks(userId).subscribe(data => {
        this.feedbacks = data;
        console.log("Loaded feedbacks:", data);
    });
  }

  addFeedback() {
    if (this.newNote.trim() && this.userId) {
        const feedbackData = {
            note: this.newNote,
            employee: { id: this.userId }
        };

        console.log("Sending feedback data:", feedbackData);

        this.feedbackService.createFeedback(feedbackData as Feedback).subscribe(() => {
            this.loadUserFeedbacks(this.userId!);
            this.newNote = '';
        });
    } else {
        console.warn("Cannot add feedback: Note is empty or user ID is missing.");
    }
  }


  deleteFeedback(id: number) {
    console.log("Deleting feedback with ID:", id);
    if (this.userId) {
      this.feedbackService.deleteFeedback(id).subscribe(() => {
        this.loadUserFeedbacks(this.userId!);
      });
    } else {
      console.warn("Cannot delete feedback: User ID is missing.");
    }
  }

  selectFeedback(feedback: Feedback) {
    console.log("Editing feedback with ID:", feedback.id);
    this.selectedFeedback = { ...feedback };
    this.updatedNote = feedback.note;
  }

  saveFeedback() {
    if (this.selectedFeedback) {
      this.selectedFeedback.note = this.updatedNote;
      console.log("Saving updated feedback:", this.selectedFeedback);
      this.feedbackService.updateFeedback(this.selectedFeedback).subscribe(() => {
        if (this.userId) {
          this.loadUserFeedbacks(this.userId);
        }
        this.selectedFeedback = null;
        this.updatedNote = '';
      });
    } else {
      console.warn("Cannot save feedback: No feedback selected.");
    }
  }

  cancelEdit() {
    console.log("Canceling edit.");
    this.selectedFeedback = null;
    this.updatedNote = '';
  }
}
