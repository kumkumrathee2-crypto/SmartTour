# ✈️ Smart Tour - AI-Powered Travel Planning Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-SmartTour-brightgreen?style=for-the-badge&logo=githubpages)](https://kumkumrathee12.github.io/SmartTour/)

> **Live Application**: [https://kumkumrathee12.github.io/SmartTour/](https://kumkumrathee12.github.io/SmartTour/)

Smart Tour is a web-based travel planning platform designed to make trip planning easier, visual, and personalized. Instead of searching destinations, hotels, routes, and attractions separately, Smart Tour brings these features together into one intuitive interface.

![Smart Tour](assets/hero.jpg)

---

## 🌟 Features

- 🌍 **Destination Discovery**: Explore global destinations with rich photography, ratings, weather indicators, best travel seasons, and budget estimates.
- 🪄 **Personalized 4-Step Planner**: Customize travel dates, group type (*Solo, Couple, Family, Friends*), and pace (*Relaxed, Balanced, Fast-Paced*) to synthesize an optimal day-by-day travel blueprint.
- 🔐 **User Authentication & Cloud Storage**: Register and sign in with JWT token authentication to sync trip blueprints across devices.
- 🤖 **Smart AI Itinerary Engine**: Backend REST API (`/api/ai/generate`) for dynamic itinerary generation.
- 🗓️ **Interactive Day-Wise Itinerary Studio**: Drag, reorder, add, or remove activities. Real-time cost updates with multi-currency support (*USD, EUR, GBP, INR, JPY*).
- 🗺️ **Location & Route Map Integration**: Leaflet.js interactive maps with numbered attraction pins and sequential route lines.
- 💡 **Travel Persona Quiz**: Guided 3-question quiz for instant destination recommendations.
- 🧳 **Smart Packing Checklist**: Weather-tailored packing lists with custom item additions.
- 💾 **Saved Trips & Export Options**: Cloud database & LocalStorage persistence, printable PDF export, and share link generation.
- 🌙 **Dark/Light Mode**: Full responsive design with seamless dark mode toggle.

---

## 🛠️ Built With

- **Frontend**: HTML5, Vanilla CSS3 (Custom Properties & Responsive Grid), JavaScript (ES6+)
- **Backend API**: Node.js, Express.js, JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), CORS
- **Mapping & Icons**: Leaflet.js (Interactive Route Maps & Custom Pins), FontAwesome 6

---

## 🚀 Quick Start & Running locally

### 1. Clone the repository
```bash
git clone https://github.com/kumkumrathee12/SmartTour.git
cd SmartTour
```

### 2. Install dependencies & Start Backend REST API
```bash
npm install
npm start
```

The application and REST API server will run at **`http://localhost:5000`**.
