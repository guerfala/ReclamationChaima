import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from 'src/app/models/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8082/reclamations';

  constructor(private http: HttpClient) { }

  
  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiUrl);
  }
  
  getUserReclamations(userId: number): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiUrl}/user?userId=${userId}`);
  }
  
  createReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.apiUrl, reclamation);
  }
  
  updateReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(this.apiUrl, reclamation);
  }

  deleteReclamation(id: number): Observable<void> {
    if (id !== undefined && id !== null) {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    } else {
        console.warn("Invalid ID for deletion:", id);
        return new Observable<void>();
    }
  }
  
  getReclamationById(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.apiUrl}/${id}`);
  }
}
