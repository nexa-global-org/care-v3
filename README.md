````markdown
# 🐾 Nexa Shelter Platform

> **One platform. Thousands of shelters. Zero code duplication.**

Nexa Shelter Platform is a multi-tenant web platform that enables animal shelters to create and manage their own adoption websites without requiring technical knowledge.

Built with **Next.js**, **Supabase**, and **Tailwind CSS**, the platform allows each shelter to authenticate, manage its content through a simple dashboard, and instantly publish a public website using a unique URL.

Unlike the previous generation of the platform, which relied on Google Sheets and static JSON configuration files, this version uses Supabase as the single source of truth, providing real-time updates, authentication, cloud storage, and virtually unlimited scalability.

---

# Vision

Thousands of animal shelters across Latin America struggle with limited technical resources.

Many still depend on social media posts, spreadsheets, or messaging applications to promote adoptions, receive donations, and communicate with volunteers.

The goal of this platform is to eliminate the technological barrier by allowing any shelter to create and maintain its own professional website in minutes.

The platform is designed around one principle:

> **Technology should adapt to rescuers, not rescuers to technology.**

Every decision prioritizes simplicity, maintainability, and long-term scalability.

---

# Key Features

## 🌐 Public Website

Every registered shelter receives its own public website.

Example:

```
https://nexa.org/salvando-patitas
```

Each website includes:

- Home page
- Shelter information
- Adoption catalog
- Pet profiles
- Donation information
- Volunteer information
- Contact information
- Online store (optional)

Although every shelter has a different URL and content, every site is generated from the same application.

---

## 🔐 Shelter Dashboard

Each shelter has access to a private administration panel.

Only authenticated shelters can access it.

The dashboard allows rescuers to update their website without editing code.

Main modules:

- Dashboard overview
- Shelter information
- Pet management
- Store management
- Statistics
- Support & partnerships

---

## 📊 Dashboard Overview

After logging in, users are welcomed with a simple dashboard.

Instead of overwhelming rescuers with unnecessary metrics, only useful information is presented.

Examples:

- Pets adopted
- Pets waiting for adoption
- Website visitors
- Recent activity

The interface is intentionally minimal to reduce cognitive load.

---

## 🐶 Pet Management

Shelters can:

- Add pets
- Edit pets
- Archive pets
- Delete pets
- Upload multiple images
- Change adoption status

No technical knowledge is required.

---

## 🏠 Shelter Information

Shelters can update:

- Logo
- Cover image
- About section
- Contact information
- Address
- Social media
- Donation information
- Volunteer information

Changes are reflected immediately on the public website.

---

## 🛍 Store Management

Shelters may optionally publish products.

Examples:

- Merchandise
- Handmade products
- Donations
- Accessories

The objective is to generate sustainable income for rescue operations.

---

## 🤝 Support Center

The platform also connects shelters with organizations that can provide assistance.

This section includes:

- NGOs
- Alliances
- Funding opportunities
- Volunteer programs
- Educational resources

This transforms the platform from a website generator into a collaborative ecosystem.

---

# User Flow

```
Create account
        │
        ▼
Verify email
        │
        ▼
Complete shelter information
        │
        ▼
Upload images
        │
        ▼
Save information
        │
        ▼
Generate website
        │
        ▼
Website available at

nexa.org/{slug}
```

No deployment is required.

No configuration files are created.

No developer intervention is necessary.

---

# Multi-Tenant Architecture

This platform follows a multi-tenant architecture.

Instead of deploying one application per shelter, a single application serves every organization.

```
                    Next.js Application

                           │

        ┌──────────────────┼──────────────────┐

        ▼                  ▼                  ▼

     Shelter A         Shelter B         Shelter C

     /patitas          /huellitas        /esperanza
```

The URL slug determines which shelter data should be loaded.

Every shelter shares:

- The same codebase
- The same infrastructure
- The same deployment
- The same components

Only the content changes.

---

# Architecture Principles

The project intentionally avoids unnecessary architectural complexity.

Instead of implementing multiple abstraction layers (DAO, Repository, Service, Mapper, etc.), it follows a feature-oriented architecture that aligns with the needs of a modern Next.js application.

Core principles:

- Feature-first organization
- Server Components by default
- Minimal abstraction
- Direct Supabase integration
- Reusable UI components
- Strong TypeScript typing
- Maintainability over complexity

The goal is to maximize developer productivity while minimizing long-term maintenance costs.

---

# Project Structure

```
src
│
├── app/                    # Next.js App Router
│   ├── (public)/           # Public websites
│   ├── (dashboard)/        # Private dashboard
│   ├── login/
│   ├── register/
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   ├── dashboard/
│   └── public/
│
├── features/
│   ├── auth/
│   ├── shelters/
│   ├── pets/
│   ├── shop/
│   ├── analytics/
│   └── dashboard/
│
├── lib/
│   ├── supabase/
│   ├── constants.ts
│   └── utils.ts
│
├── hooks/
│
├── types/
│
└── middleware.ts
```

The project is organized by business features rather than technical layers, making it easier to maintain and extend over time.

---

# Why Supabase?

The previous platform stored shelter information inside Google Sheets and generated JSON configuration files.

Although effective for an initial prototype, this approach introduced several limitations:

- Manual updates
- JSON generation
- Git commits for new shelters
- Deployment dependency
- Limited scalability

The new platform replaces this workflow entirely.

Supabase provides:

- Authentication
- PostgreSQL database
- Object storage
- Row Level Security
- Real-time capabilities
- Scalable infrastructure

Supabase becomes the single source of truth for every shelter.

---

# Previous Workflow

```
Shelter

    │

Google Sheets

    │

Generate JSON

    │

Git Commit

    │

Deploy

    │

Website
```

---

# Current Workflow

```
Shelter

    │

Dashboard

    │

Supabase

    │

Website updated instantly
```

No intermediate steps.

No deployments.

No configuration files.

---

# Scalability

The platform is designed to support thousands of shelters.

Adding a new shelter no longer requires:

- Creating JSON files
- Editing configuration
- Deploying a new project
- Writing additional code

A new shelter simply creates an account.

The platform automatically provisions its website.

```
Shelter creates account

        │

Database record

        │

Unique slug

        │

Website generated
```

Growth depends on data, not infrastructure.

---

# Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
    - Authentication
    - PostgreSQL
    - Storage
    - Row Level Security
- Vercel

---

# Design Philosophy

This project is guided by five fundamental principles.

### Simplicity

Technology should never become another obstacle for animal rescuers.

---

### Accessibility

The dashboard is designed for users without technical experience.

---

### Scalability

One application should support thousands of independent shelters.

---

### Maintainability

The codebase favors clarity over unnecessary abstraction.

---

### Social Impact

Technology is a tool to increase animal adoptions, strengthen shelters, and expand the impact of organizations working in animal welfare.

---

# Future Roadmap

- Drag-and-drop page builder
- Website themes
- Analytics dashboard
- Adoption request management
- Volunteer management
- Donation campaigns
- Event management
- Email notifications
- AI-assisted content generation
- Multi-language support
- Mobile-first dashboard
- Public API

---

# License

This project is developed by **Nexa** as part of its mission to empower social organizations through technology.

Built with ❤️ for animal shelters.
````
