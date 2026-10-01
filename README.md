# ✈️ Smart Tour - AI-Powered Travel Planning Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-SmartTour-brightgreen?style=for-the-badge&logo=githubpages)](https://kumkumrathee12.github.io/SmartTour/)

> **Live Application**: [https://kumkumrathee12.github.io/SmartTour/](https://kumkumrathee12.github.io/SmartTour/)

Smart Tour is an intelligent web-based travel planning platform designed to make trip planning effortless, visual, and personalized. Instead of searching destinations, hotels, routes, and attractions separately, Smart Tour brings these features together into one intuitive single-page application.

![Smart Tour](assets/hero.jpg)

---

## 🌟 Features

- 🌍 **Destination Discovery**: Explore global destinations with rich photography, ratings, weather indicators, best travel seasons, and budget estimates.
- 🪄 **Personalized 4-Step Planner**: Customize travel dates, group type (*Solo, Couple, Family, Friends*), and pace (*Relaxed, Balanced, Fast-Paced*) to synthesize an optimal day-by-day travel blueprint.
- 🔐 **User Authentication & Cloud Storage**: Register and sign in with demo credentials or email/password. Supports hybrid backend REST API and seamless static hosting fallback.
- 🤖 **Smart AI Itinerary Engine**: Dynamic itinerary generation engine with automated day-wise activity scheduling.
- 🗓️ **Interactive Day-Wise Itinerary Studio**: Drag, reorder, add, or remove activities. Real-time cost updates with multi-currency support (*USD, EUR, GBP, INR, JPY*).
- 🗺️ **Location & Route Map Integration**: Leaflet.js interactive maps with numbered attraction pins and sequential route lines.
- 💡 **Travel Persona Quiz**: Guided 3-question quiz for instant destination recommendations based on your preferences.
- 🧳 **Smart Packing Checklist**: Weather-tailored packing lists with custom item additions.
- 💾 **Saved Trips & Export Options**: Cloud database & LocalStorage persistence, printable PDF export, and share link generation.
- 🌙 **Dark/Light Mode**: Full responsive design with seamless dark mode toggle.

---

## 📋 Step-by-Step Usage Guide

### 1. 🌐 Accessing the Application
- Open the live deployment link: **[https://kumkumrathee12.github.io/SmartTour/](https://kumkumrathee12.github.io/SmartTour/)**

### 2. 🔐 Signing In & Account Access
1. Click the **Sign In** button in the top navigation header.
2. **Quick Demo Login**: Click the **⚡ Fill Demo Credentials** button in the sign-in modal. This automatically fills `demo@smarttour.com` and password `demo123456`.
3. **New User Account**: Click the **Create Account** tab, enter your Full Name, Email, and Password, and click **Create Free Account**.
4. Once signed in, your account name will be displayed in the header, and your saved trip blueprints will automatically sync.

### 3. 🗺️ Exploring Destinations & Filtering
1. Click **Destinations** in the top navigation bar.
2. Filter destinations by tapping category pills (*Culture, Nature, Food, Heritage, Adventure, Romance*).
3. Search for any city or country using the search bar or sort by *Rating*, *Name*, or *Budget Tier*.
4. Click **Details** on any destination card to view weather forecasts, local travel tips, and popular attractions.

### 4. 🪄 Generating & Customizing a Trip Itinerary
1. Click **Plan a Trip** in the navigation header or **Plan Trip** on any destination card.
2. Complete the 4-Step Trip Wizard:
   - **Step 1**: Select Destination
   - **Step 2**: Choose Start & End Dates / Trip Duration
   - **Step 3**: Select Travel Group (*Solo, Couple, Family, Friends*)
   - **Step 4**: Choose Travel Pace (*Relaxed, Balanced, Fast-Paced*)
3. Click **Generate Itinerary** to launch the **Itinerary Studio**.
4. View your day-by-day itinerary alongside an **interactive Leaflet map** showing pins and route paths.
5. Click **Add Attraction** to insert additional spots or customize activities.

### 5. 🧳 Packing Checklist & Multi-Currency
- Change currency anytime using the **Currency Dropdown** ($ USD, € EUR, £ GBP, ₹ INR, ¥ JPY) in the header to update all costs in real-time.
- Click **Packing Checklist** in the Itinerary Studio to view a smart packing list tailored to your destination's weather. Add custom packing items as needed.

### 6. 💾 Saving, Sharing & Exporting Trips
- Click **Save Trip** to store your itinerary in **Saved Trips**.
- Click **Share Blueprint** to copy a shareable trip link.
- Click **Print / Export PDF** to generate a clean, printable itinerary.

---

## 🛠️ Built With

- **Frontend**: HTML5, Vanilla CSS3 (Custom Properties & Responsive Grid), JavaScript (ES6+)
- **Backend API**: Node.js, Express.js, JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), CORS
- **Mapping & Icons**: Leaflet.js (Interactive Route Maps & Custom Pins), FontAwesome 6
- **Database**: Lowdb / JSON Database (`server/data/db.json`)

---

## 🚀 Running Locally

### 1. Clone the Repository
```bash
git clone https://github.com/kumkumrathee12/SmartTour.git
cd SmartTour
```

### 2. Install Dependencies & Start Server
```bash
npm install
npm start
```

### 3. Access Local Application
- Frontend & Backend REST API: **`http://localhost:5000`**
- API Health Check: **`http://localhost:5000/api/health`**

---

## 📄 License
Crafted with ❤️ for effortless travel planning.
