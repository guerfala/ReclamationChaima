import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { Reclamation } from 'src/app/models/reclamation';

@Component({
  selector: 'app-admin-reclamations',
  templateUrl: './admin-reclamations.component.html',
  styleUrls: ['./admin-reclamations.component.css']
})
export class AdminReclamationsComponent implements OnInit {
  reclamations: Reclamation[] = [];
  selectedReclamation: Reclamation | null = null;
  updatedComment: string = '';

  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.loadAllReclamations();
  }

  loadAllReclamations() {
    this.reclamationService.getAllReclamations().subscribe(data => {
      this.reclamations = data;
    });
  }

  deleteReclamation(id: number) {
    this.reclamationService.deleteReclamation(id).subscribe(() => {
      this.loadAllReclamations();
    });
  }

  selectReclamation(reclamation: Reclamation) {
    this.selectedReclamation = {...reclamation}; // Create a copy to avoid direct binding
    this.updatedComment = reclamation.comment;
  }

  saveReclamation() {
    if (this.selectedReclamation) {
      this.selectedReclamation.comment = this.updatedComment;
      this.reclamationService.updateReclamation(this.selectedReclamation).subscribe(() => {
        this.loadAllReclamations();
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
