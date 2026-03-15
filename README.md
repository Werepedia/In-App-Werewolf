# Werepedia In-App Guide - Sample Repository

> **Note for Plato Developers:** This is an isolated sample repository containing _only_ the WebView integration portion of Werepedia. The main website code has been omitted to focus purely on the multi-language Single Page Application (SPA) designed to be embedded within the Plato app (Android/iOS). The `vercel.json` has also been simplified to highlight the required routing and embedding headers (`X-Frame-Options` and `Content-Security-Policy`).

The application is built to serve as the community guide for the Werewolf game.

## WebView Integration Guide

This application is designed to handle multiple languages through URL pathing to ensure instant loading times and prevent client-side redirect flashes.

### URL Structure

To load the guide in the correct language, construct the WebView URL dynamically before opening the view using the following structure:

`https://werepedia.vercel.app/{lang}/in-app/werewolf-guide`

### Fallback Logic

To provide the best UX, we recommend the following fallback logic when constructing the URL from the native app:

1. **App Language**: Try to inject the user's currently selected Plato app language code.
2. **OS Language**: If the app language is not supported by this guide, fallback to the device's OS language code.
3. **Default**: If neither is supported, default to English (`en`).

## Supported Languages

The guide currently supports **8 languages**, fully optimized for both LTR and RTL reading directions.

| Language      | ISO Code (`{lang}`) | Direction |
| ------------- | ------------------- | --------- |
| English       | `en`                | LTR       |
| Spanish       | `es`                | LTR       |
| French        | `fr`                | LTR       |
| Portuguese    | `pt`                | LTR       |
| Arabic        | `ar`                | RTL       |
| Persian/Farsi | `fa`                | RTL       |
| Thai          | `th`                | LTR       |
| Malay         | `ms`                | LTR       |

## Deep Linking (Internal Routes)

The SPA uses a hash-based router combined with the native History API to manage views without reloading the page. Native apps can deep-link directly to specific sections by appending the hash route to the base URL:

- **About (Home)**: _(Default, no hash)_
- **Rules**: `#rules`
- **Roles**: `#roles`
- **Strategies**: `#strategies`
- **FAQ**: `#faq`

_Example: `https://werepedia.vercel.app/en/in-app/werewolf-guide#roles`_

## Architecture & Tech Stack

This project is built with a focus on maximum performance, minimal dependencies, and native-feeling interactions.

- \*_Vanilla JavaScript (ES6+)_: Zero external frameworks or libraries to keep the bundle size extremely small and fast.
- **Hash-Based SPA Router**: Uses `window.location.hash` combined with the native `History API` (`pushState` and `popstate`) for seamless, completely client-side view transitions without page reloads.
- **CSS Logical Properties**: Utilizes modern CSS logical properties (`inset-inline-start`, `padding-inline`, etc.) to support both LTR and RTL layouts using a single, universal stylesheet.
- **Asset Optimization**: Role card images are fetched directly from Plato's CDN, and all local assets are optimized WebP/SVG.
- **Mobile-First Design**: UI components (interactive carousels, sticky navs, and toggleable lists) are built specifically for touch interactions on mobile devices.

## Project Structure

To maintain a clean architecture, all shared assets (like the universal stylesheet and UI icons) are decoupled from the localized content.

```text
/
├── assets/
│   ├── css/in-app/
│   │   └── styles.css              # Universal stylesheet (handles LTR & RTL via logical properties)
│   └── img/images/                 # Minimal local UI icons (Role cards are fetched from Plato CDN)
├── {lang}/in-app/werewolf-guide/   # Language-specific directories (en, es, fr, ar, fa, pt, th, ms)
│   ├── index.html                  # Translated markup
│   └── script_{lang}.js            # Translated role data & UI interaction logic
├── vercel.json                     # Server rewrite rules for SPA routing & language paths
└── README.md
```
