import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { Reclamation } from 'src/app/models/reclamation';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-reclamations',
  templateUrl: './user-reclamations.component.html',
  styleUrls: ['./user-reclamations.component.css']
})
export class UserReclamationsComponent implements OnInit {
  reclamations: Reclamation[] = [];
  newComment: string = '';
  selectedReclamation: Reclamation | null = null;
  updatedComment: string = '';
  userId: number | null = null;

  constructor(
    private reclamationService: ReclamationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    if (this.userId) {
      this.loadUserReclamations(this.userId);
    }
  }

  loadUserReclamations(userId: number) {
    this.reclamationService.getUserReclamations(userId).subscribe(data => {
      this.reclamations = data;
    });
  }

  addReclamation() {
    if (this.newComment.trim() && this.userId) {
      const newReclamation: Reclamation = {
        id: 0,
        comment: this.newComment,
        employee: { id: this.userId, name: '', lastname: '', email: '', phonenumber: 0, post: '', dateEmb: new Date(), salary: 0 }
      };
      this.reclamationService.createReclamation(newReclamation).subscribe(() => {
        this.loadUserReclamations(this.userId!);
        this.newComment = '';
      });
    }
  }

  deleteReclamation(id: number | undefined) {
    if (id !== undefined) {
        console.log("Deleting reclamation with ID:", id);
        this.reclamationService.deleteReclamation(id).subscribe(() => {
            if (this.userId) {
                this.loadUserReclamations(this.userId);
            }
        });
    } else {
        console.warn("Attempted to delete a reclamation with an undefined ID");
    }
  }

  selectReclamation(reclamation: Reclamation) {
    console.log("Editing reclamation with ID:", reclamation.id);
    this.selectedReclamation = { ...reclamation };
    this.updatedComment = reclamation.comment;
  }

  saveReclamation() {
      if (this.selectedReclamation) {
          this.selectedReclamation.comment = this.updatedComment;

          console.log("Saving updated reclamation:", this.selectedReclamation);

          this.reclamationService.updateReclamation(this.selectedReclamation).subscribe(() => {
              if (this.userId) {
                  this.loadUserReclamations(this.userId);
              }
              this.selectedReclamation = null;
              this.updatedComment = '';
          });
      }
  }


  cancelEdit() {
    this.selectedReclamation = null;
    this.updatedComment = '';
  }
}
