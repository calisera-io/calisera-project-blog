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

So how do you architect a system like this? Here's our approach—while not yet complete, it encompasses all elements of the MVP we're building. Our primary objective is creating something solid that leverages current technology and scales effectively. This prioritizes architectural robustness over the rapid iteration and time-to-market concerns typical of conventional MVP methodologies—a deliberate choice for this learning-focused project.

## Why Microservices?

Both of us come from companies that developed monolithic products with low test coverage, and we've experienced firsthand the long-term overhead and struggle this creates — tightly coupled components where failures cascade system-wide, inabilities in scaling specific features independently, lengthy deployment cycles, difficulties onboarding new developers, and an accumulation technical debt that makes refactoring increasingly difficult.

Although microservices systems take longer initially to develop, they offer clear advantages: independent deployment and scaling, technology flexibility per service, isolated failures, clear boundaries for maintainability, and parallel team development. For a learning project focused on building production-grade skills, investing in a microservices architecture from the start provides hands-on experience with patterns that are increasingly standard in modern software development.

## Our High-Level System Architecture

![High-level architecture diagram](/images/blog/high_level_architecture.png)

[View full resolution](https://drive.google.com/file/d/1sqEQkl8l1K7wX3KamJ8nlrT68nuOsaaC/view?usp=sharing)

With this foundation in mind, we designed Calisera around two customer-facing components. First, a mobile application for Android and iPhone enables providers to design profile pages with their service offerings and available timeslots. Second, a web application allows customers to browse and book available slots. Providers generate unique QR codes or URLs to embed in their social media profiles, creating a direct path to their personalized booking pages. While both frontend interfaces share some backend services, they each have distinct access patterns tailored to their specific use cases.

### The Backend Services

The backend implements a microservices architecture with five specialized services. Here's how they work together:

**User Service** handles authentication and authorization for everyone—providers, customers, and guests. The challenge? Balancing security with a smooth user experience. We need to support multiple OAuth providers (Google, Apple, Facebook) while maintaining full control over our authentication flow and token lifecycle.

Our solution is a Backend-For-Frontend OAuth pattern with token exchange. External providers verify who users are, but then our backend takes over—issuing its own JWT tokens for session management instead of relying on provider tokens. This gives us centralized security policies, custom claims, and complete control over how sessions work across the platform.

**Provider Service** is where providers build their presence. They manage their data, service catalogs, and schedules through unique profile pages. Taking cues from social media, providers can make their services visually engaging with images and aesthetic customization.

We're building support for three distinct service types to cover different booking scenarios: Simple services for one-on-one appointments, Event services for single-occurrence gatherings with multiple participants, and Class services for recurring group sessions. This structure allows providers to model their actual business offerings while maintaining a consistent booking interface.

**Listing Service** does the real-time math. When a customer views a provider's profile page, this service calculates which time slots are actually available for booking. It pulls provider configurations (those three service types) from Provider Service and cross-references them with existing bookings from Booking Service.

It's completely stateless with caching. No database of its own—it just computes availability on-demand, ensuring customers always see accurate, real-time availability without us storing redundant data.

**Booking Service** orchestrates the reservation lifecycle, serving as the central coordination point for all appointment operations. When a customer books a time slot, the Booking Service records the reservation and emits events to a message queue—for example, a "booking created" event immediately makes that slot unavailable in future calculations and triggers notification workflows. This event-driven approach keeps dependent systems synchronized without tight coupling.

**Notification Service** listens for those booking events and springs into action, sending communications through external SMS, email, and push notification channels. A "booking created" event triggers confirmations, while "booking cancelled" events notify both parties.

The beauty of this design? Decoupling. If email delivery is slow or temporarily down, bookings still succeed. Notifications catch up when they can, but the core booking functionality never gets blocked.

**Analytics Service** gives providers insight into their business through a dedicated data pipeline. An ETL process runs on schedule, pulling operational data from our microservice databases, transforming it, and loading it into a Data Warehouse. From there, Analytics Service powers provider dashboards showing booking trends, service performance, customer demographics, and capacity utilization.

Why the separate warehouse? Analytical queries can be heavy. By keeping them away from our transactional databases, we ensure that someone browsing their stats doesn't slow down a customer trying to book an appointment.

### A Note on Payments

One deliberate omission: payment processing. Providers collect payments directly from customers outside our platform. This strategic decision significantly reduces complexity—no payment gateway integration, no PCI compliance headaches, no financial transaction management. For this MVP, it lets us focus entirely on perfecting the booking experience itself.

## Architecture Principles and Foundation

This architecture rests on several key principles that emerged from our design process.

The microservices approach gives us clear separation of concerns. Each service can evolve and scale based on its own needs without forcing changes elsewhere. Need to handle a spike in bookings? Scale up Booking Service. Analytics queries getting heavy? Add Data Warehouse capacity. Everything moves independently.

Event-driven communication—especially between Booking and Notification services—shows how asynchronous design improves resilience. Services don't wait on each other. They publish what happened and move on. Subscribers react when they're ready.

Our Backend-For-Frontend OAuth pattern with custom JWT tokens? That gives us complete control over authentication flows and security policies. Critically, it keeps sensitive OAuth tokens from external providers securely stored on our backend, never exposing them to the client where they'd be vulnerable to XSS attacks or token theft. We're not at the mercy of third-party token lifecycles or limitations—we control session duration, refresh logic, and can revoke access independently of the OAuth provider.

And excluding payment processing was a decision not just motivated by reducing complexity—it was about strategic scope management. Every decision to include something is also a decision about where not to spend time and resources. For an educational MVP, this trade-off let us concentrate on building a rock-solid booking system.

Ultimately, this project is a practical exploration of production-grade architecture patterns. We're balancing scalability requirements with the pragmatic realities of building an educational MVP—one that prioritizes learning and long-term maintainability over shortcuts that would come back to haunt us later.