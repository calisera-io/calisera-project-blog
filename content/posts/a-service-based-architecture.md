---
title: "Designing a Scalable Booking System: A Service-Based Architecture"
date: "2025-10-15"
excerpt: "How we architected Calisera, a mobile-first appointment scheduling platform, using service-based architecture to balance scalability with the pragmatic realities of building an MVP."
author: "Sabine & Marcus"
featured: true
tags: ["featured", "service-based-architecture", "architecture", "booking-system", "mvp", "scalability"]
featuredImages: ["/images/blog/high_level_architecture.png"]
heroImage: "/images/blog/high_level_architecture.png"
---

Calisera is a mobile-first appointment scheduling platform where professionals can create polished booking interfaces for their services directly from their phones.

So how do you architect a system like this? Here's our approach — while not yet complete, it encompasses all elements of the MVP we're building. Our primary objective is to create something solid that leverages current technology and scales effectively. This means prioritizing architectural robustness over the rapid-iteration mindset typical of conventional MVPs — a deliberate choice for this learning-focused project.

---

## Why Service-Based Architecture?

Both Marcus and I have experience with monolithic architectures with low test coverage and tightly coupled logic. We've seen how small changes can ripple through an entire codebase, slowing releases and blocking modernization. Those experiences shaped our decision to go modular from day one.

Service-based architecture strikes the right balance for our needs: it provides service separation and independent deployment while sharing a common database and avoiding the operational complexity of true microservices. This approach offers cleaner boundaries than a monolith but remains pragmatic for a small team building an MVP. For us, this project isn't just a product — it's a playground for learning scalable patterns without over-engineering.

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

- **Provider Service** is where providers build their presence, handles provider profiles, service catalogs, and schedules.   

    We're building support for three distinct service types to cover different booking scenarios: Simple services for one-on-one appointments, Event services for single-occurrence gatherings with multiple participants, and Class services for recurring group sessions. This structure allows providers to model their actual business offerings while maintaining a consistent booking interface.

- **Booking Service** orchestrates the reservation lifecycle, serving as the central coordination point for all appointment operations. When a customer books a time slot, the Booking Service records the reservation and emits events to a message queue  —  for example, a "booking created" event immediately makes that slot unavailable in future calculations and triggers notification workflows. This event-driven approach keeps dependent systems synchronized without tight coupling. 

- **Listing Service** does the real-time math. When a customer views a provider's profile page, this service calculates which time slots are actually available for booking. It pulls provider configurations from Provider Service and cross-references them with existing bookings from Booking Service.

    It's completely stateless with caching. No database of its own — it just computes availability on-demand, ensuring customers always see accurate, real-time availability without us storing redundant data.

- **Notification Service** listens for booking events and sends confirmations or cancellations via email, SMS, or push notifications — decoupled but sharing the same data store for consistency.  

- **Analytics Service** gives providers insight into their business through an event-driven pipeline. It subscribes to business events from the event queue (bookings, completions, cancellations), processes them, and stores aggregated insights. This powers provider dashboards showing booking trends, service performance, customer demographics, and capacity utilization. 

---

## A Note on Payments

One deliberate omission: payment processing. Providers handle payments directly outside the platform. This single choice removed a vast layer of complexity, allowing us to focus entirely on a frictionless booking experience for the MVP. Payment integration can come later once the core value is proven.

---

## Core Architectural Principles (and Honest Trade-offs)


**1. Modularity & Evolvability: Service Separation with Shared Database**  
Let's be clear: we're inspired by microservices — their scalability and modularity are appealing — but we had to keep costs down and deployment as simple as possible while still refraining from building a monolith. Our design is service-based and domain-driven: each service owns its domain logic and data tables within a shared database, following bounded context principles.

This shared database approach was necessary because separate databases would balloon cloud infrastructure costs to levels that make no sense for an MVP with potentially just a handful of early users. It keeps **costs** reasonable and **complexity** manageable while giving us clean service boundaries and independent deployments. We get strong **modularity** and simpler data access within each service's domain. The downside? The database can potentially become a bottleneck, limiting overall **scalability** and **fault tolerance**. The architecture maintains strong **evolvability** — if we need to split the database later, our bounded context boundaries make that migration path clear.

**2. Elasticity: Stateless Listing Service**  
Where scalability matters most — when customers are browsing availability — we built it right. The Listing Service is completely stateless with no database of its own. It pulls provider configurations and existing bookings on-demand, calculates available slots in real-time, and relies entirely on caching. This means it can scale independently to handle traffic spikes without bottlenecks. When a provider reaches sudden stardom and everyone's booking their appointments, we can spin up more Listing Service instances instantly.

The trade-off? It's dependent on other services being available. If Provider Service goes down, the Listing Service can't fetch configurations and browsing fails. We sacrifice some **fault tolerance** for the benefit of **elasticity** and keeping the service truly stateless.

**3. Fault Tolerance & Evolvability: Event-Driven Communication**  
Key services — Booking, Notification, and Analytics — communicate through events published to a message queue instead of calling each other directly. When a booking is created, other services react when they're ready — no tight coupling, no cascading failures. This improves **fault tolerance** (services can recover and process queued events) and **evolvability** (add new event subscribers without touching existing services).

The catch? Eventual consistency means you need to think harder about race conditions and ordering. Debugging "why didn't this notification send?" across async events is trickier than tracing a direct function call. We accepted this complexity as a deliberate trade-off for resilience.

## The Reality Check  
This architecture prioritizes getting to market over production-grade scale. The shared database limits our ability to scale services independently, and our event system needs more maturity before it's truly resilient. But we've built something **modular**, **testable**, and **evolvable** — which means when we do need to scale, we'll know exactly where to refactor. And if the MVP doesn't find traction? We haven't blown our budget on over-engineered infrastructure that nobody needs.