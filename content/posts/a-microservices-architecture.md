---
title: "Designing a Scalable Booking System: A Service-Based Architecture"
date: "2025-10-15"
excerpt: "How we architected Calisera, a mobile-first appointment scheduling platform, using service-based architecture to balance scalability with the pragmatic realities of building an educational MVP."
author: "Sabine"
featured: true
tags: ["featured", "service-based-architecture", "architecture", "booking-system", "mvp", "scalability"]
featuredImages: ["/images/blog/high_level_architecture.png"]
heroImage: "/images/blog/high_level_architecture.png"
---

Calisera is a mobile-first appointment scheduling platform where professionals can create polished booking interfaces for their services directly from their phones.

So how do you architect a system like this? Here's our approach—while not yet complete, it encompasses all elements of the MVP we're building. Our primary objective is to create something solid that leverages current technology and scales effectively. This means prioritizing architectural robustness over the rapid-iteration mindset typical of conventional MVPs—a deliberate choice for this learning-focused project.

---

## Why Service-Based Architecture?

Both Marcus and I came from monolithic environments with low test coverage and tightly coupled logic. We've seen how small changes can ripple through an entire codebase, slowing releases and blocking modernization. Those experiences shaped our decision to go modular from day one.

Service-based architecture strikes the right balance for our needs: it provides service separation and independent deployment while sharing a common database and avoiding the operational complexity of true microservices. This approach offers cleaner boundaries than a monolith but remains pragmatic for a small team building an MVP. For us, this project isn't just a product—it's a playground for learning scalable patterns without over-engineering.

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

The backend follows a service-based architecture with independent services, each focused on a single responsibility using a shared database with logical separation for simplified data management. Here's how they work together:

- **User Service** manages authentication and authorization using a secure Backend-for-Frontend OAuth pattern. External providers verify identity, while Calisera issues its own tokens for centralized control over sessions, refresh logic, and security policies.  

- **Provider** is where providers build their presence, handles provider profiles, service catalogs, and schedules.   

    We're building support for three distinct service types to cover different booking scenarios: Simple services for one-on-one appointments, Event services for single-occurrence gatherings with multiple participants, and Class services for recurring group sessions. This structure allows providers to model their actual business offerings while maintaining a consistent booking interface.

- **Booking Service** orchestrates the reservation lifecycle, serving as the central coordination point for all appointment operations. When a customer books a time slot, the Booking Service records the reservation and emits events to a message queue — for example, a "booking created" event immediately makes that slot unavailable in future calculations and triggers notification workflows. This event-driven approach keeps dependent systems synchronized without tight coupling. 

- **Listing Services** does the real-time math. When a customer views a provider's profile page, this service calculates which time slots are actually available for booking. It pulls provider configurations from Provider Service and cross-references them with existing bookings from Booking Service.

    It's completely stateless with caching. No database of its own—it just computes availability on-demand, ensuring customers always see accurate, real-time availability without us storing redundant data.

- **Notification Service** listens for booking events and sends confirmations or cancellations via email, SMS, or push notifications—decoupled but sharing the same data store for consistency.  

- **Analytics Service** gives providers insight into their business through an event-driven pipeline. It subscribes to business events from the event queue (bookings, completions, cancellations), processes them, and stores aggregated insights. This powers provider dashboards showing booking trends, service performance, customer demographics, and capacity utilization. 

---

## A Note on Payments

One deliberate omission: payment processing. Providers handle payments directly outside the platform. This single choice removed a vast layer of complexity, allowing us to focus entirely on a frictionless booking experience for the MVP. Payment integration can come later once the core value is proven.

---

## Core Architectural Principles

**1. Service Separation with Shared Data**  
Each service can evolve and deploy independently while accessing a common database. This eliminates the complexity of distributed data management while maintaining clear service boundaries. Booking traffic surging? Scale the Booking Service only. Analytics queries growing heavy? Add read replicas. Independent scaling with simplified data access.

**2. Event-Driven Communication**  
Services publish events ("booking.created", "booking.cancelled") that other services react to when ready. This asynchronous design improves resilience and makes the system easily extensible—new services can subscribe without changing existing code, while all services maintain consistent views through the shared database.

**3. Secure Backend-for-Frontend OAuth**  
Our BFF model stores sensitive OAuth tokens on the server, never in the client, preventing exposure to XSS or token theft. We control token claims, session duration, and revocation policies independently of third-party providers. Security and user experience both benefit.

**4. Strategic Scope Management**  
Leaving out payments and other secondary features was intentional. Every exclusion created room to refine reliability, traceability, and data flow—skills that matter more for this educational MVP than rapid feature expansion.

* deployability
* elasticity
* evolvability
* fault tolerance
* modularity
* overall cost
* performance
* reliability
* scalability
* simplicity
* testability

---

## Where We Are Now

Right now, we have the **core of the User Service and Provider Service** working, forming the backbone for authentication and provider management. We've also implemented **global timezone handling and availability logic**, ensuring accurate scheduling across different regions.

Next, we're moving into **frontend development**—bringing the provider mobile app and customer-facing web interface to life—and building out the **Booking and Notification Services** that will power real-time reservations.

The goal isn't to release fast, but to build a system we fully understand and can scale confidently later. Each service we complete strengthens the foundation for everything that follows.

---

## What's Next

Our upcoming milestones focus on three things:  
- Implementing the Booking Service and event-driven notifications  
- Developing both user interfaces (mobile and web)  
- Preparing for the Analytics Service and data pipeline  

We'll continue documenting the process as Calisera evolves—follow along on the Calisera blog or connect with me on LinkedIn to see the system take shape step by step.
