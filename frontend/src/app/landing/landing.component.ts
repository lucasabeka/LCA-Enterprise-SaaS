import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {

  stats = [
    { value: '500+', label: 'Projets migrés' },
    { value: '99.2%', label: 'Précision' },
    { value: '10min', label: 'En moyenne' }
  ];

  features = [
    {
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      tag: 'PARSING', title: 'Analyse intelligente',
      description: 'Extraction complète des dépendances, plugins et configurations de votre pom.xml. Détection automatique des incompatibilités Java 8.',
      stat: '< 2s', statLabel: "Temps d'analyse"
    },
    {
      icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      tag: 'MIGRATION', title: 'Migration automatique',
      description: 'Transformation des patterns Java 8 vers Java 21. Records, sealed classes, pattern matching, virtual threads — tout géré par Claude AI.',
      stat: '200+', statLabel: 'Patterns reconnus'
    },
    {
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      tag: 'VALIDATION', title: 'Validation IA',
      description: 'Review complet par Claude AI : sécurité, performance, compatibilité. Rapport détaillé avec score de confiance.',
      stat: '99.2%', statLabel: 'Taux de succès'
    }
  ];

  pricingTiers = [
    {
      name: 'Starter', price: 'Gratuit', period: '', description: 'Pour découvrir LCA', highlight: false,
      features: ['3 projets/mois', 'Analyse pom.xml', 'Rapport basique', 'Support communauté']
    },
    {
      name: 'Pro', price: '€49', period: '/mois', description: 'Pour les équipes actives', highlight: true,
      features: ['Projets illimités', 'Migration complète', 'Rapport avancé + export', 'Support prioritaire 24h', 'CI/CD Integration', 'API Access']
    },
    {
      name: 'Enterprise', price: 'Sur mesure', period: '', description: 'Pour les grandes organisations', highlight: false,
      features: ['Volume illimité', 'Déploiement on-premise', 'SSO / SAML', 'SLA garanti 99.9%', 'Account Manager dédié', 'Audit complet']
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() { this.initCodeRain(); }

  navigateToDashboard() { this.router.navigate(['/dashboard']); }

  private initCodeRain() {
    setTimeout(() => {
      const canvas = document.getElementById('codeCanvas') as HTMLCanvasElement;
      if (!canvas) return;
      const ctx = canvas.getContext('2d')!;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const chars = 'Java21RecordsSealedVirtualThreadsLambdaStream{}()<>';
      const fontSize = 13;
      const columns = Math.floor(canvas.width / fontSize);
      const drops: number[] = Array(columns).fill(1);
      function draw() {
        ctx.fillStyle = 'rgba(3, 6, 13, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      }
      setInterval(draw, 60);
    }, 100);
  }
}
