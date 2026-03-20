# LCA Enterprise SaaS

> **L'IA qui migre votre code Java 8 vers Java 21 en 10 minutes.**

Analysez, modernisez et validez automatiquement vos projets Maven grâce à Claude AI.

## Stack Technique

| Couche | Technologie |
|--------|------------|
| Backend | Spring Boot 3.4 · Java 21 · Maven |
| Database | PostgreSQL |
| AI | Anthropic Claude SDK |
| Frontend | Angular 19 · Bootstrap 5.3 |
| Design | Terminal Noir — Space Mono + Syne |

## Structure

```
LCA-Enterprise-SaaS/
├── backend/          # Spring Boot 3.4 (Java 21)
│   ├── pom.xml
│   └── src/main/java/com/lca/enterprise/
└── frontend/         # Angular 19 + Bootstrap 5.3
    └── src/app/
        ├── landing/  # Landing Page Enterprise
        └── dashboard/ # Dashboard avec upload pom.xml
```

## Démarrage rapide

### Backend
```bash
cd backend
export ANTHROPIC_API_KEY=your-key
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
ng serve
```

Ouvrir http://localhost:4200

## API Endpoints

- `POST /api/v1/migration/analyze` — Analyse un pom.xml
- `GET /api/v1/migration/health` — Santé du service

---
*Propulsé par [Claude AI](https://anthropic.com) · © 2026 LCA Enterprise*
