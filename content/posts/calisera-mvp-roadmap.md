---
title: 'Building a Booking Platform MVP: How We Scoped Features Without Burning Out The Team'
date: '2025-11-11'
excerpt: 'How the Calisera team built a professional-grade booking platform MVP by focusing on essential features, solid architecture, and ruthless prioritization—proving that disciplined planning beats overbuilding, even in a side project.'
authors: ['Sabine']
featured: false
tags:
    [
        'Features',
        'Road Map',
        'MVP',
        'Scalability',
        'Jira',
        'Project Management',
        'Product Ownership',
    ]
featuredImages: ['/images/blog/jira_mvp_screenshot.png']
heroImage: '/images/blog/jira_mvp_screenshot_sm.png'
---

Picture this: You start a side project full of excitement. You build the authentication system because that feels important. Then you get excited about real-time notifications—those are cool! Then you start on the UI. Then you add a feature you saw in another app. Before you know it, your codebase is a tangled mess of half-finished features. Eventually it's too messy to work with, and the project joins the "I'll come back to this someday" graveyard.

Sound familiar? Yeah, we've all been there.

Here's the thing nobody tells you about side projects: **the hardest part isn't the code. It's deciding what _not_ to build.**

As we develop Calisera—a mobile-first appointment booking platform—I've learned that good project management isn't about having all the answers upfront. It's about being ruthlessly focused on the MVP while keeping the team energized and moving forward. Even when that means saying no to features you _know_ would be cool.

Here's how we approached scoping our MVP roadmap without fixed delivery dates—and why that's actually a feature, not a bug.

## The Two Paths Most Side Projects Take (And Why We Chose Neither)

Most side projects fall into one of two camps:

**The Developer-Excited Approach**: The scenario I just described. Jump straight into coding whatever sounds fun, end up with a mess. We've all done it. It's fun until it isn't.

**The Lean MVP Approach**: Ship a scrappy prototype fast to validate the idea. Use duct tape and shortcuts. If it gains traction, great—rebuild it properly later. If it doesn't, you haven't wasted time on "premature optimization."

Both approaches make total sense. The first is about learning and exploration. The second is about speed and validation.

But we chose a different path: **professional standards from day one**. Not because we had to, but because we wanted to challenge ourselves. We wanted to prove we could build something with real architecture, real planning, and real discipline—even in our free time. That meant saying no to a lot of features, but yes to quality.

Planning feels like overhead when you're coding in your free time. But **planning gives you vision and a clear path forward**. It's the difference between shipping something coherent versus abandoning a half-built prototype.

Yes, planning takes time—discussion, alignment, tough decisions. But it eliminates miscommunication and prevents rebuilding things. When you're working with limited free time, you can't afford to waste it.

As we develop Calisera—a mobile-first appointment booking platform—I've learned that treating a side project _professionally_ doesn't mean making it less fun. It means respecting the complexity of what you're building and giving it the structure it needs to succeed.

Because booking platforms aren't simple. Multiple user types, real-time availability calculations, timezone handling, notification workflows—this stuff gets complex fast. Without planning, you end up with a half-built prototype that does five things poorly instead of one thing well.

## The Challenge: Side Projects Need Different Rules

Most product management wisdom assumes dedicated resources and predictable velocity. Our "team"? Professionals coding at night after day jobs. We needed a roadmap that shows clear priorities without making promises we'd break, and keeps us motivated on achievable milestones.

## Our Approach: Sequencing Over Timelines

Instead of creating a roadmap with calendar dates we'd inevitably miss, we organized our work into a **priority-based sequence** that acknowledges the reality of part-time development.

I know, I know—"but stakeholders need dates!"

Except... we don't really have traditional stakeholders breathing down our necks. And honestly? Being upfront about uncertainty is more professional than making up dates to sound credible.

### The Architecture Decision Nobody Asked Us to Make

Before diving into features, we made what might seem like a controversial decision: invest upfront in solid architecture.

Yes, I can hear the lean startup police screaming at me already. "Ship fast! Iterate! Don't over-engineer!"

But here's the thing—this project is as much about learning as it is about shipping. And both my co-founder and I have worked on systems where adding new features meant refactoring half the codebase. We wanted something different: **get a concise MVP working, then scale it up smoothly without having to rebuild**.

So we chose a [service-based architecture](https://blog.calisera.io/blog/post/a-service-based-architecture/) with clearly separated domains:

-   **User Service** for authentication via Backend-for-Frontend OAuth
-   **Provider Service** for managing profiles, catalogs, and schedules
-   **Listing Service** for real-time availability calculations (stateless, highly scalable)
-   **Booking Service** orchestrating reservations via event-driven workflows
-   **Notification Service** handling confirmations through email, SMS, and push
-   **Analytics Service** providing business intelligence to providers

This foundation meant we could parallelize feature development without services stepping on each other's toes. More importantly, it gave us confidence that features built today wouldn't need major rewrites tomorrow.

Oh, and because we wanted something professional and scalable? We committed to 80% minimum test coverage across all services. Every endpoint, every business logic function, every edge case gets a test. Slows us down now, saves us later.

Did this approach slow us down initially? Absolutely. Will it pay off? I'm betting yes.

### The MVP Feature Set: What Actually Made the Cut

Our MVP centers on one core user journey: **A service provider can publish their services with availability, and customers can book appointments seamlessly.** (Think: Alex offers Haircut, 45 min, available Mon-Fri 9-18h, Wednesdays off. Jordan books a haircut Thursday 13:00-13:45)

Simple, right?

Ha. The moment you start designing this, you realize appointment booking is a rabbit hole of edge cases and "what ifs."

We organized all our work in Jira using **Epics as feature groupings**, each representing a complete capability. Here's what survived the chopping block:

**Epic 1: Authentication & User Management**  
Providers authenticate via OAuth (Google, Apple) or email/password. Customers authenticate via phone number only—because we're mobile-first. Providers are on Instagram, their customers are too. No one wants to create an account just to book a haircut they saw on social media.

**Epic 2: Provider Services & Profiles**  
Three service types cover most scheduling scenarios: Simple (1-on-1 appointments), Event (single-occurrence gatherings), Class (recurring group sessions). This differentiation was crucial—one "universal" booking flow would've been bloated and confusing.

**Epic 3: Availability Management**  
Weekly recurring schedules, booking windows, buffer times, and schedule exclusions. Focused for MVP—no complex multi-location scheduling.

**Epic 4: Customer Booking Flow**  
Three steps: Select service → Pick time → Enter contact info. No accounts required. No payments. Just: find time, book, done.

**Epic 5: Booking Management**  
Providers see upcoming appointments in their mobile app. Customers can cancel via unique link. Both receive notifications for changes.

**Epic 6: Notifications & Confirmations**  
Event-driven architecture—when Booking Service records a reservation, Notification Service picks it up asynchronously.

**Epic 7: Provider Analytics**  
This was key—we kept it in the MVP but built a minimal version. Providers get basic insights (booking trends, service performance, customer demographics, capacity utilization) through an event-driven pipeline that keeps analytics separate from live booking operations.

## What We Ruthlessly Cut

Every feature you say yes to is a hidden no to something else. Here's what didn't make the MVP:

**❌ Payment Processing** - Stripe integration, PCI compliance, refunds, currencies, tax laws. Could take 3-4 months of free time. Providers collect payment externally for now.

**❌ Multi-Location Scheduling** - Many Instagram-native providers don't have fixed locations (traveling hairdressers, mobile therapists). Supporting this adds complexity we don't need yet.

**❌ Team/Staff Management** - Single provider, single calendar. No delegating or multi-practitioner clinics. But our separated User/Provider Service architecture makes it straightforward to add later.

**❌ Custom Booking Forms** - No intake questionnaires or custom fields. Just contact info and optional notes.

**❌ Advanced Availability Rules** - No conditional pricing or customer-type restrictions.

**❌ Cancellation Policies with Penalties** - Free cancellation for now. (We'd need payments first anyway.)

## How We Organized Work in Jira

We have about 90 tickets across 7 epics in our backlog. "When will it be done?" No idea. But here's what we _can_ communicate: priority, sequence, and what we're actively working on.

![High-level architecture diagram](/images/blog/jira_mvp_screenshot.png)
[View full resolution](https://drive.google.com/file/d/1DwSYO8zBqiXFjp0yQLEJKAnH4Kp_bxIV/view?usp=sharing)

We organized by Epic and sorted by priority—but we're not rigidly sequential. While our infrastructure person sets up the OTP system for auth, we're already building booking UI/UX. No point waiting when work can happen independently.

Every ticket is tagged with its Epic and assigned a Priority (Highest/High/Medium/Low/Lowest). We can filter and sort by either dimension—see all tickets for one Epic, or see all high-priority work across epics. No burndown charts. No sprint commitments we'll miss. Just clear communication about what we're building and in what order.

## What Planning This Roadmap Taught Me

Building Calisera's MVP roadmap reinforced one lesson: **the best roadmaps are built on strategic nos.**

Every "yes" to a feature is a hidden "no" to something more important—quality, focus, or shipping at all. I used to think good planning meant having answers for everything. Now I know it means being clear about what you're _not_ doing, and why.

The other lessons:

**Planning takes time but saves more later.** Upfront discussion prevents rebuilding things or miscommunicating requirements when you're exhausted from night coding.

**Sequence matters more than dates.** "Build X before Y because Y depends on X" is honest. "Build X by March" is a guess.

**Architecture enables flexibility.** Solid structure lets you add the right features later without tearing everything down.

**Cutting scope protects quality.** Say no ruthlessly, and you create space to do remaining work well.

## Where We Are Now

We're actively developing the core booking flow right now. And by "actively" I mean "whenever we have a free evening and aren't too tired from our actual jobs."

Our immediate focus:

✅ Provider profile creation and service definition  
🚧 Weekly schedule configuration with time slots  
🚧 Real-time availability calculation  
📋 Customer booking interface with phone verification  
📋 SMS/email confirmations  
📋 Booking management and cancellations

Will we ship everything in this list? Maybe. Probably. Hopefully?

But more importantly, we'll ship _something_ that works really well for its intended purpose. Because we said no to everything else.

---

## 📔 Following Along: Our Living Specification

Treating a side project professionally means documenting the details—even when you're moving fast!

While this article covers the _why_ behind our roadmap, all the detailed _what_ and _how_ for every feature is tracked in our living Notion document. It serves as the single source of truth for the project, making sure that what we build is exactly what we scoped.

**[Technical Feature Specification: Complete MVP Scope](https://your-notion-link-here)**

---

_Written as part of my preparation for project manager roles, demonstrating product ownership, roadmap planning, and technical communication skills._

**P.S.** We're looking for developers and designers who want to join us on this journey. If you're interested in building something professional in your free time, reach out.
