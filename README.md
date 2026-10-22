# Streamly — SaaS de streaming (starter)

Starter full-stack pour construire une plateforme de streaming légale, inspirée des grands services du marché.
Ce dépôt fournit une interface Next.js, un catalogue de démonstration et le plan d'intégration Supabase/Stripe/Mux.

## Fonctionnalités incluses dans ce starter
- Page d'accueil sombre, responsive, avec hero, recherche, filtres et rangées de contenus.
- Fiches de contenu et bouton de lecture de démonstration.
- Structure Next.js App Router.
- Schéma SQL Supabase pour profils, titres, favoris, historique et abonnements.
- Variables d'environnement d'exemple.
- Guide de mise en production.

## Prérequis
- Node.js 20+
- Un compte Supabase (base de données et authentification)
- Stripe pour les paiements
- Un fournisseur vidéo tel que Mux ou Cloudflare Stream
- Des droits de diffusion pour chaque vidéo publiée

## Démarrage
```bash
npm install
cp .env.example .env.local
npm run dev
```
Puis ouvrir http://localhost:3000.

L'interface de démonstration fonctionne avec des données fictives. Les paiements, l'authentification et le streaming protégé ne deviennent actifs qu'après configuration des services et des clés.

## Services recommandés
- **Next.js** : site et API.
- **Supabase Auth + Postgres** : comptes et données.
- **Stripe Checkout + Billing Portal** : abonnements et facturation.
- **Mux ou Cloudflare Stream** : encodage, diffusion adaptative et URLs signées.
- **Vercel** : hébergement de l'application.

## Étapes avant lancement public
1. Créer un projet Supabase et exécuter `supabase/schema.sql`.
2. Configurer l'authentification et les règles RLS.
3. Créer les produits/prix dans Stripe et vérifier les webhooks côté serveur.
4. Configurer Mux/Cloudflare Stream; ne jamais exposer les clés privées au navigateur.
5. Ajouter les contrôles d'accès côté serveur à chaque lecture.
6. Ajouter CGU, politique de confidentialité, gestion des cookies, mentions légales et processus de suppression de compte.
7. Tester les paiements, remboursements, annulations, appareils mobiles et charges simultanées.
8. Publier uniquement des contenus que vous possédez ou pour lesquels vous avez les droits nécessaires.

## Important
Ce projet est un **starter MVP**, pas un service prêt à encaisser des paiements en production. Les clés secrètes, webhooks, règles d'accès, conformité et droits de diffusion doivent être configurés et testés avant ouverture au public.
