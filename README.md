# PELAGOS — Luxury Yacht & Travel Android Prototype

A high-fidelity mobile prototype and design system created for **PELAGOS**, a fictional luxury yacht charter and trans-oceanic expedition atelier. Designed to demonstrate senior-level Android UI/UX craftsmanship, Material Design 3 Expressive patterns, and modern Jetpack Compose architecture to potential clients and stakeholders.

---

## 🛥️ Overview & Concept

PELAGOS represents the intersection of haute naval engineering and private concierge travel. Rather than a generic booking application or basic CRUD interface, PELAGOS immerses the user into a luxury editorial journey:

> **Discover an incredible yacht → Explore naval architecture & deck plans → Trace bespoke cruising routes → Begin a private charter reservation.**

The application runs inside a photorealistic **Google Pixel 9 Pro** flagship hardware simulation with Android 15 system indicators (dynamic clock, 5G signal, battery, punch-hole camera, and gesture navigation bar), with an instant toggle for full-canvas viewing.

---

## ✨ Key Features & Screens

### 1. Discovery Feed (`DiscoveryScreen`)
- **Flagship Spotlight**: Hero vessel card featuring *AURELIA* (78m Feadship) with zero-pill typographic metadata (`78.4m · 12 Guests · 26 Crew`), weekly charter rates, and quick bookmarking.
- **Segmented Fleet Filters**: Instant filtering across Megayachts (70m+), Superyachts, Carbon Eco-Catamarans, and Polar Ice Explorers.
- **Expedition Highlights Rail**: Horizontal carousel spotlighting private anchorages in Amalfi, Monaco, the Greek Cyclades, and the Bahamas.
- **Accredited Proof**: MYBA Superyacht Charter accreditation trust indicators.

### 2. Vessel Exploration & Specs (`YachtDetailScreen`)
- **Multi-Angle Gallery**: High-resolution views covering Aft Profiles, Panoramic Sky Lounges, Master Suites, Sundecks, and Tender Garages.
- **Interactive Deck Plan Viewer**: Switch between Sun Deck, Bridge Deck, Main Deck, and Lower Deck with live architectural deck blueprints.
- **Naval Specifications**: Length overall (LOA), beam, draft, cruising speed, builder provenance, and refit year.
- **Tender & Water Toy Garage**: Comprehensive inventory including personal submersibles, limousine tenders, and carbon e-Foils.
- **Assigned Senior Broker Card**: Direct quayside contact for personalized maritime route filings.

### 3. Curated Expeditions & Routes (`DestinationsScreen`)
- **Day-by-Day Waypoints**: 7-day nautical route timelines with protected anchorages, private tender excursions, and Michelin reservations.
- **Seasonal Intelligence**: Prime cruising windows and coordinate tracking.
- **Fleet Pairing**: Tailored vessel recommendations matched to regional draft and berthing requirements.

### 4. Material 3 Charter Inscription (`BookingSheet`)
- **Android Modal Bottom Sheet**: Native drag handle affordance and smooth spring motion.
- **Bespoke Inclusions**: Tarmac helicopter transfers and private sommelier cellar provisions.
- **APA Calculator**: Real-time Advance Provisioning Allowance (30%) estimation.
- **Instant Priority Confirmation**: Generates a verified charter reference number (`#PEL-88241`).

### 5. Jetpack Compose Architecture Inspector (`ComposeCodeModal`)
- Includes an in-app code inspector displaying production-ready Kotlin Jetpack Compose code:
  - `YachtDetailScreen.kt`: Collapsing top bar with `nestedScroll`, `HorizontalPager`, and `ModalBottomSheet`.
  - `DiscoveryScreen.kt`: `LazyColumn` state management and segmented controls.
  - `PelagosTheme.kt`: Material 3 dark color tokens, typography, and shapes.
  - `CharterViewModel.kt`: Unidirectional data flow with `StateFlow<CharterUiState>` and Kotlin Coroutines.

---

## 🎨 Design System & Visual Guidelines

- **Color Palette (60-30-10 Rule)**:
  - **Dominant Canvas (60%)**: Pelagos Obsidian (`#080C14`)
  - **Structural Surfaces (30%)**: Aegean Midnight (`#0E1626`) and Elevated Card Surface (`#121A2B`)
  - **High-Intent Accent (10%)**: Champagne Sandstone Gold (`#C5A880` / `#F59E0B`)
- **Typography**:
  - **Display / Brand**: *Cormorant Garamond* (Italian luxury editorial serif)
  - **Body / Interface**: *Plus Jakarta Sans* (Clean, legible touch-first UI)
  - **Telemetry & Numbers**: *JetBrains Mono* with `font-variant-numeric: tabular-nums`
- **Zero-Broken-Image Policy**: Built-in SVG architectural blueprint fallback containers to ensure visual completeness regardless of network connectivity.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Mobile UX / Web Prototype** | React 19, TypeScript, Tailwind CSS v4, Motion, Lucide React, Vite 8 |
| **Target Android Specs** | Android 15 (Target SDK 35), Kotlin 2.0, Jetpack Compose, Material 3 Expressive |
| **Architecture** | Unidirectional Data Flow (UDF), MVVM with `StateFlow`, Clean Architecture |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd pelagos-luxury-yacht

# Install dependencies
npm install

# Start development server
npm run dev
```

The prototype dev server will start on `http://localhost:3000`.

### Building & Linting

```bash
# Type check & lint
npm run lint

# Production build
npm run build
```

---

## 📄 License

This prototype is crafted for demonstration purposes under the Apache-2.0 License.
