import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Migration {
  id: string; project: string; javaFrom: string; javaTo: string;
  status: 'completed' | 'running' | 'pending' | 'error';
  progress: number; date: string; duration: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  activeNav = 'dashboard';
  isDragging = false;
  uploadedFile: File | null = null;

  stats = [
    { label: 'Total Migrations', value: '1 247', change: '+12%', trend: 'up', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
    { label: 'En cours', value: '3', change: 'Live', trend: 'neutral', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Completées', value: '1 238', change: '99.3%', trend: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Erreurs', value: '6', change: '-40%', trend: 'down', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' }
  ];

  navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'migrations', label: 'Migrations', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'projects', label: 'Projets', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
    { id: 'reports', label: 'Rapports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'settings', label: 'Paramètres', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
  ];

  recentMigrations: Migration[] = [
    { id: 'MIG-1247', project: 'banking-core', javaFrom: '1.8', javaTo: '21', status: 'completed', progress: 100, date: '20/03/2026', duration: '8m 12s' },
    { id: 'MIG-1246', project: 'auth-service', javaFrom: '1.8', javaTo: '21', status: 'running', progress: 67, date: '20/03/2026', duration: '5m 34s' },
    { id: 'MIG-1245', project: 'payment-gateway', javaFrom: '11', javaTo: '21', status: 'running', progress: 23, date: '20/03/2026', duration: '2m 01s' },
    { id: 'MIG-1244', project: 'legacy-crm', javaFrom: '1.8', javaTo: '21', status: 'error', progress: 0, date: '19/03/2026', duration: '—' },
    { id: 'MIG-1243', project: 'notification-svc', javaFrom: '1.8', javaTo: '21', status: 'completed', progress: 100, date: '19/03/2026', duration: '6m 58s' },
    { id: 'MIG-1242', project: 'report-engine', javaFrom: '1.8', javaTo: '21', status: 'pending', progress: 0, date: '19/03/2026', duration: '—' }
  ];

  constructor(private router: Router) {}

  setNav(id: string) { this.activeNav = id; }
  goToLanding() { this.router.navigate(['/']); }
  onDragOver(event: DragEvent) { event.preventDefault(); this.isDragging = true; }
  onDragLeave() { this.isDragging = false; }
  onDrop(event: DragEvent) {
    event.preventDefault(); this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files?.length) this.handleFile(files[0]);
  }
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.handleFile(input.files[0]);
  }
  private handleFile(file: File) {
    if (file.name.endsWith('.xml')) this.uploadedFile = file;
  }
  clearUpload() { this.uploadedFile = null; }
  getStatusClass(s: string): string {
    return { completed: 'badge-completed', running: 'badge-running', pending: 'badge-pending', error: 'badge-error' }[s] || '';
  }
  getStatusLabel(s: string): string {
    return { completed: 'Terminé', running: 'En cours', pending: 'En attente', error: 'Erreur' }[s] || s;
  }
}
