import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from 'src/app/models/feedback';

@Component({
  selector: 'app-admin-feedbacks',
  templateUrl: './admin-feedbacks.component.html',
  styleUrls: ['./admin-feedbacks.component.css']
})
export class AdminFeedbacksComponent implements OnInit {
  feedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;
  updatedNote: string = '';

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadAllFeedbacks();
  }

  loadAllFeedbacks() {
    this.feedbackService.getAllFeedbacks().subscribe(data => {
      this.feedbacks = data;
    });
  }

  deleteFeedback(id: number) {
    this.feedbackService.deleteFeedback(id).subscribe(() => {
      this.loadAllFeedbacks();
    });
  }

  selectFeedback(feedback: Feedback) {
    this.selectedFeedback = { ...feedback };
    this.updatedNote = feedback.note;
  }

  saveFeedback() {
    if (this.selectedFeedback) {
      this.selectedFeedback.note = this.updatedNote;
      this.feedbackService.updateFeedback(this.selectedFeedback).subscribe(() => {
        this.loadAllFeedbacks();
        this.selectedFeedback = null;
        this.updatedNote = '';
      });
    }
  }

  cancelEdit() {
    this.selectedFeedback = null;
    this.updatedNote = '';
  }
}
