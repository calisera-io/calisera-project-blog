---
title: "Designing a Scalable Booking System: A Microservices Architecture"
date: "2025-10-15"
excerpt: "How we architected Calisera, a mobile-first appointment scheduling platform, using microservices to balance scalability with the pragmatic realities of building an educational MVP."
author: "Sabine"
featured: true
tags: ["featured", "microservices", "architecture", "booking-system", "mvp", "scalability"]
featuredImages: ["/images/blog/high_level_architecture.png"]
heroImage: "/images/blog/high_level_architecture.png"
---

Calisera is a mobile-first appointment scheduling platform where professionals can create polished booking interfaces for their services directly from their phones.

So how do you architect a system like this? Here's our approach—while not yet complete, it encompasses all elements of the MVP we’re building. Our primary objective is to create something solid that leverages current technology and scales effectively. This means prioritizing architectural robustness over the rapid-iteration mindset typical of conventional MVPs—a deliberate choice for this learning-focused project.

---

## Why Microservices?

Both Marcus and I came from monolithic environments with low test coverage and tightly coupled logic. We’ve seen how small changes can ripple through an entire codebase, slowing releases and blocking modernization. Those experiences shaped our decision to go fully modular from day one.

Although microservices take longer to build initially, they offer clear advantages: independent deployment and scaling, isolated failures, technology flexibility per service, and cleaner ownership boundaries. For us, this project isn’t just a product—it’s a playground for learning production-grade patterns used in modern software systems.

---

## Our High-Level System Architecture

![High-level architecture diagram](/images/blog/high_level_architecture.png)

[View full resolution](https://drive.google.com/file/d/1sqEQkl8l1K7wX3KamJ8nlrT68nuOsaaC/view?usp=sharing)

Calisera has two customer-facing components:  
- **A mobile app** (Android + iOS) where providers design profile pages, define services, and set availability.  
- **A web app** where customers browse providers and book appointments.  

Providers generate unique QR codes or URLs to embed in their social media profiles, creating a direct path to their personalized booking pages. Both frontends share backend services but use them differently depending on their roles.

---

## The Backend Services

The backend follows a microservices architecture with six independent services, each focused on one responsibility.

- **User Service** manages authentication and authorization using a secure Backend-for-Frontend (BFF) OAuth pattern. External providers (Google, Apple, Facebook) verify identity, while Calisera issues its own JWTs for centralized control over sessions, refresh logic, and security policies.  

- **Provider & Listing Services** handle provider profiles, service catalogs, and real-time availability. Listing Service calculates which time slots are open by combining provider schedules with existing bookings. It’s stateless and cache-optimized—no redundant data, always fresh availability.  

- **Booking Service** will orchestrate reservations—validating time slots, recording reservations, and emitting booking events to keep other services synchronized.  

- **Notification Service** will listen for those booking events and send confirmations or cancellations via email, SMS, or push notifications—decoupled and asynchronous.  

- **Analytics Service** will later provide insights for providers through a separate data pipeline, ensuring performance isolation between operational and analytical workloads.

Together, these services form a resilient, event-driven system: one booking action can trigger multiple workflows without tight coupling. If notifications fail, bookings still succeed; if analytics runs late, the user experience remains unaffected.

---

## A Note on Payments

One deliberate omission: payment processing. Providers handle payments directly outside the platform. This single choice removed a vast layer of complexity—no PCI compliance, refund flows, or gateway integrations—allowing us to focus entirely on a frictionless booking experience for the MVP. Payment integration can come later once the core value is proven.

---

## Core Architectural Principles

**1. Separation of Concerns**  
Each service can evolve, deploy, and scale independently. Booking traffic surging? Scale the Booking Service only. Analytics queries growing heavy? Add data-warehouse capacity. Independent movement keeps the system stable and maintainable.

**2. Event-Driven Communication**  
Instead of blocking calls, services will publish events (“booking.created”, “booking.cancelled”) that subscribers react to when ready. This asynchronous design improves resilience and makes the system easily extensible—new services can subscribe without changing existing code.

**3. Secure Backend-for-Frontend OAuth**  
Our BFF model stores sensitive OAuth tokens on the server, never in the client, preventing exposure to XSS or token theft. We control token claims, session duration, and revocation policies independently of third-party providers. Security and user experience both benefit.

**4. Strategic Scope Management**  
Leaving out payments and other secondary features was intentional. Every exclusion created room to refine reliability, traceability, and data flow—skills that matter more for this educational MVP than rapid feature expansion.

---

## Where We Are Now

Right now, we have the **core of the User Service and Provider Service** working, forming the backbone for authentication and provider management. We’ve also implemented **global timezone handling and availability logic**, ensuring accurate scheduling across different regions.

Next, we’re moving into **frontend development**—bringing the provider mobile app and customer-facing web interface to life—and building out the **Booking and Notification Services** that will power real-time reservations.

The goal isn’t to release fast, but to build a system we fully understand and can scale confidently later. Each service we complete strengthens the foundation for everything that follows.

---

## What’s Next

Our upcoming milestones focus on three things:  
- Implementing the Booking Service and event-driven notifications  
- Developing both user interfaces (mobile and web)  
- Preparing for the Analytics Service and data pipeline  

We’ll continue documenting the process as Calisera evolves—follow along on the Calisera blog or connect with me on LinkedIn to see the system take shape step by step.
