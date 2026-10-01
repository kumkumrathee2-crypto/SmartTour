/**
 * Smart Tour - Main Application Logic
 */

// Global State
const state = {
  currentTab: 'home',
  currency: 'USD',
  currencyRates: {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    INR: { symbol: '₹', rate: 83.5 },
    JPY: { symbol: '¥', rate: 150 }
  },
  destinations: DESTINATIONS_DATA,
  activeDestination: null,
  activeTrip: null, // Current active itinerary
  activeDayNum: 1,  // Selected day in itinerary studio (1-indexed or 'all')
  savedTrips: JSON.parse(localStorage.getItem('smart_tour_saved_trips')) || [],
  
  // Wizard state
  wizardStep: 1,
  wizardData: {
    destId: '',
    startDate: '',
    endDate: '',
    durationDays: 3,
    group: 'Solo',
    pace: 'Balanced'
  },

  // Map reference
  map: null,
  markersLayer: null,
  polylineLayer: null,

  // Quiz state
  quizStep: 0,
  quizAnswers: {}
};

// ==========================================================================
// Initializer
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCurrency();
  initNavigation();
  initHomeView();
  initDestinationsView();
  initPlannerWizard();
  initModals();
  initQuiz();
  initAuthUI();
  fetchBackendData();
  updateSavedBadge();

  // Load default preset trip or first destination if URL has hash
  handleRouteHash();
});

// ==========================================================================
// Theme & Currency Utilities
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem('smart_tour_theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('theme-icon').className = 'fa-regular fa-sun';
  }

  document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('smart_tour_theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-icon').className = isDark ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
    showToast(isDark ? 'Switched to Dark Mode 🌙' : 'Switched to Light Mode ☀️');
  });
}

function initCurrency() {
  const select = document.getElementById('global-currency-select');
  select.value = state.currency;
  select.addEventListener('change', (e) => {
    state.currency = e.target.value;
    renderFeaturedDestinations();
    renderAllDestinations();
    if (state.activeTrip) {
      renderItineraryStudio();
    }
    showToast(`Currency updated to ${state.currency}`);
  });
}

function formatPrice(usdCost) {
  const { symbol, rate } = state.currencyRates[state.currency] || { symbol: '$', rate: 1 };
  const converted = Math.round(usdCost * rate);
  return `${symbol}${converted.toLocaleString()}`;
}

// ==========================================================================
// Navigation & Router
// ==========================================================================
function initNavigation() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = link.getAttribute('data-tab');
      switchTab(tab);
    });
  });

  document.getElementById('logo-btn').addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('home');
  });

  document.getElementById('saved-trips-btn').addEventListener('click', () => {
    switchTab('saved');
  });

  document.getElementById('start-planning-nav-btn').addEventListener('click', () => {
    openPlannerForDestination(state.destinations[0].id);
  });

  document.getElementById('view-all-destinations-btn')?.addEventListener('click', () => {
    switchTab('destinations');
  });
}

function switchTab(tabName) {
  state.currentTab = tabName;
  window.location.hash = tabName;

  // Update Nav Links Active Class
  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.getAttribute('data-tab') === tabName) {
      l.classList.add('active');
    } else {
      l.classList.remove('active');
    }
  });

  // Toggle Tab Views
  document.querySelectorAll('.tab-view').forEach(v => {
    v.style.display = 'none';
    v.classList.remove('active-view');
  });

  const targetView = document.getElementById(`view-${tabName}`);
  if (targetView) {
    targetView.style.display = 'block';
    targetView.classList.add('active-view');
  }

  // View specific callbacks
  if (tabName === 'saved') {
    renderSavedTrips();
  } else if (tabName === 'destinations') {
    renderAllDestinations();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleRouteHash() {
  const hash = window.location.hash.replace('#', '');
  if (['home', 'destinations', 'planner', 'saved'].includes(hash)) {
    switchTab(hash);
  }
}

// ==========================================================================
// Home View & Featured Cards
// ==========================================================================
function initHomeView() {
  renderFeaturedDestinations();

  // Search input listeners
  const searchInput = document.getElementById('hero-search-input');
  const catSelect = document.getElementById('hero-category-select');
  const searchBtn = document.getElementById('hero-search-submit');

  const handleHeroSearch = () => {
    const q = searchInput.value.trim().toLowerCase();
    const cat = catSelect.value;
    switchTab('destinations');
    
    // Apply filters in destinations view
    if (q) {
      filterDestinations(q, cat);
    }
  };

  searchBtn.addEventListener('click', handleHeroSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleHeroSearch();
  });

  // Tag buttons
  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const destId = btn.getAttribute('data-dest');
      openDestinationModal(destId);
    });
  });

  // Footer destination links
  document.querySelectorAll('.footer-dest-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const destId = link.getAttribute('data-dest');
      openDestinationModal(destId);
    });
  });
}

function renderFeaturedDestinations() {
  const grid = document.getElementById('home-featured-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // Take first 3 destinations
  const featured = state.destinations.slice(0, 3);
  featured.forEach(dest => {
    grid.appendChild(createDestinationCardHTML(dest));
  });
}

function createDestinationCardHTML(dest) {
  const card = document.createElement('div');
  card.className = 'destination-card';
  
  card.innerHTML = `
    <div class="card-image-wrap">
      <img src="${dest.thumbImage}" alt="${dest.name}">
      <div class="card-badge"><i class="fa-solid fa-location-dot"></i> ${dest.country}</div>
      <div class="card-rating"><i class="fa-solid fa-star"></i> ${dest.rating}</div>
    </div>
    <div class="card-body">
      <div class="card-header">
        <h3 class="card-title">${dest.name}</h3>
        <div class="card-price">${formatPrice(dest.avgCostPerDay)}<span>/day</span></div>
      </div>
      <p class="card-tagline">${dest.tagline}</p>
      <div class="card-highlights">
        ${dest.highlights.map(h => `<span class="chip">${h}</span>`).join('')}
      </div>
      <div class="card-footer">
        <button class="btn-secondary btn-card-action explore-dest-btn" data-id="${dest.id}">
          <i class="fa-solid fa-eye"></i> Details
        </button>
        <button class="btn-primary btn-card-action plan-dest-btn" data-id="${dest.id}">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Plan Trip
        </button>
      </div>
    </div>
  `;

  // Bind buttons
  card.querySelector('.explore-dest-btn').addEventListener('click', () => {
    openDestinationModal(dest.id);
  });

  card.querySelector('.plan-dest-btn').addEventListener('click', () => {
    openPlannerForDestination(dest.id);
  });

  return card;
}

// ==========================================================================
// Explore Destinations View & Filters
// ==========================================================================
function initDestinationsView() {
  // Category Pills
  const pillsContainer = document.getElementById('category-filter-pills');
  pillsContainer.innerHTML = TRAVEL_CATEGORIES.map((cat, idx) => `
    <button class="pill-btn ${idx === 0 ? 'active' : ''}" data-cat="${cat.id}">
      <i class="fa-solid fa-${cat.icon}"></i> ${cat.name}
    </button>
  `).join('');

  pillsContainer.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      pillsContainer.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterDestinations();
    });
  });

  // Budget & Sort selects
  document.getElementById('budget-filter-select').addEventListener('change', filterDestinations);
  document.getElementById('sort-filter-select').addEventListener('change', filterDestinations);

  renderAllDestinations();
}

function renderAllDestinations(items = state.destinations) {
  const grid = document.getElementById('all-destinations-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
      <i class="fa-solid fa-search" style="font-size: 3rem; margin-bottom: 1rem; color: var(--border-color);"></i>
      <h3>No destinations match your filters</h3>
      <p>Try searching for another keyword or category.</p>
    </div>`;
    return;
  }

  items.forEach(dest => {
    grid.appendChild(createDestinationCardHTML(dest));
  });
}

function filterDestinations(query = '', categoryOverride = null) {
  const activeCatPill = document.querySelector('.pill-btn.active');
  const cat = categoryOverride || (activeCatPill ? activeCatPill.getAttribute('data-cat') : 'all');
  const budget = document.getElementById('budget-filter-select').value;
  const sort = document.getElementById('sort-filter-select').value;

  let filtered = [...state.destinations];

  // Category filter
  if (cat !== 'all') {
    filtered = filtered.filter(d => d.categories.includes(cat));
  }

  // Budget filter
  if (budget !== 'all') {
    filtered = filtered.filter(d => d.budgetTier === budget);
  }

  // Query search filter
  if (query) {
    filtered = filtered.filter(d => 
      d.name.toLowerCase().includes(query) || 
      d.country.toLowerCase().includes(query) ||
      d.highlights.some(h => h.toLowerCase().includes(query))
    );
  }

  // Sort
  if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'cost-low') {
    filtered.sort((a, b) => a.avgCostPerDay - b.avgCostPerDay);
  } else if (sort === 'cost-high') {
    filtered.sort((a, b) => b.avgCostPerDay - a.avgCostPerDay);
  }

  renderAllDestinations(filtered);
}

// ==========================================================================
// Destination Modal Drawer
// ==========================================================================
function openDestinationModal(destId) {
  const dest = state.destinations.find(d => d.id === destId);
  if (!dest) return;

  state.activeDestination = dest;
  document.getElementById('modal-dest-title').innerText = `${dest.name}, ${dest.country}`;

  const body = document.getElementById('modal-dest-body');
  body.innerHTML = `
    <div style="position: relative; height: 260px; border-radius: var(--border-radius-md); overflow: hidden; margin-bottom: 1.5rem;">
      <img src="${dest.heroImage}" style="width: 100%; height: 100%; object-fit: cover;">
      <div style="position: absolute; bottom: 1rem; left: 1rem; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); color: white; padding: 0.4rem 1rem; border-radius: 20px; font-weight: 600; font-size: 0.9rem;">
        <i class="fa-solid fa-cloud-sun"></i> Best Season: ${dest.bestSeason}
      </div>
    </div>

    <p style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem; color: var(--text-muted);">${dest.description}</p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 1.75rem; background: var(--bg-subtle); padding: 1rem; border-radius: var(--border-radius-md);">
      <div>
        <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Daily Est. Cost</span>
        <div style="font-size: 1.2rem; font-weight: 800; color: var(--primary);">${formatPrice(dest.avgCostPerDay)}</div>
      </div>
      <div>
        <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Rating</span>
        <div style="font-size: 1.2rem; font-weight: 800; color: #f59e0b;"><i class="fa-solid fa-star"></i> ${dest.rating}</div>
      </div>
      <div>
        <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Budget Tier</span>
        <div style="font-size: 1.2rem; font-weight: 800;">${dest.budgetTier}</div>
      </div>
    </div>

    <h4 style="margin-bottom: 0.75rem; font-size: 1.1rem;"><i class="fa-solid fa-map-pin" style="color: var(--primary);"></i> Key Attractions & Places</h4>
    <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
      ${dest.attractions.map(att => `
        <div style="display: flex; gap: 1rem; align-items: center; background: var(--bg-main); padding: 0.75rem; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
          <img src="${att.image}" style="width: 70px; height: 60px; object-fit: cover; border-radius: 8px;">
          <div style="flex: 1;">
            <div style="font-weight: 700; font-size: 0.95rem;">${att.name}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${att.category} • ${att.duration} • Est. ${formatPrice(att.cost)}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <h4 style="margin-bottom: 0.75rem; font-size: 1.1rem;"><i class="fa-solid fa-lightbulb" style="color: var(--secondary);"></i> Insider Local Tips</h4>
    <ul style="padding-left: 1.25rem; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem;">
      ${dest.localTips.map(tip => `<li style="margin-bottom: 0.4rem;">${tip}</li>`).join('')}
    </ul>

    <button class="btn-primary" id="modal-launch-planner-btn" style="width: 100%; justify-content: center; padding: 0.9rem; font-size: 1.05rem;">
      <i class="fa-solid fa-wand-magic-sparkles"></i> Launch Planner for ${dest.name}
    </button>
  `;

  document.getElementById('modal-launch-planner-btn').addEventListener('click', () => {
    closeModal('destination-modal');
    openPlannerForDestination(dest.id);
  });

  openModal('destination-modal');
}

// ==========================================================================
// Smart Planner Wizard Logic
// ==========================================================================
function initPlannerWizard() {
  // Populate destination select dropdown
  const select = document.getElementById('wizard-dest-select');
  select.innerHTML = `<option value="" disabled selected>-- Select Destination --</option>` +
    state.destinations.map(d => `<option value="${d.id}">${d.name}, ${d.country} (${d.budgetTier})</option>`).join('');

  // Set default dates (Tomorrow to +3 days)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const endDate = new Date(tomorrow);
  endDate.setDate(endDate.getDate() + 2);

  const formatDate = (d) => d.toISOString().split('T')[0];
  document.getElementById('wizard-start-date').value = formatDate(tomorrow);
  document.getElementById('wizard-end-date').value = formatDate(endDate);
  
  state.wizardData.startDate = formatDate(tomorrow);
  state.wizardData.endDate = formatDate(endDate);

  // Update duration display on date change
  const updateDuration = () => {
    const s = new Date(document.getElementById('wizard-start-date').value);
    const e = new Date(document.getElementById('wizard-end-date').value);
    if (!isNaN(s) && !isNaN(e) && e >= s) {
      const diffDays = Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1;
      state.wizardData.durationDays = diffDays;
      document.getElementById('wizard-duration-badge').innerText = `${diffDays} Day${diffDays > 1 ? 's' : ''}`;
    }
  };

  document.getElementById('wizard-start-date').addEventListener('change', updateDuration);
  document.getElementById('wizard-end-date').addEventListener('change', updateDuration);

  // Select destination preview
  select.addEventListener('change', (e) => {
    state.wizardData.destId = e.target.value;
    const dest = state.destinations.find(d => d.id === state.wizardData.destId);
    const preview = document.getElementById('wizard-dest-preview');
    if (dest) {
      preview.style.display = 'block';
      preview.innerHTML = `
        <div style="display: flex; gap: 1rem; align-items: center;">
          <img src="${dest.thumbImage}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px;">
          <div>
            <div style="font-weight: 700;">${dest.name} (${dest.country})</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">${dest.tagline}</div>
          </div>
        </div>
      `;
    }
  });

  // Select Tile Options (Group & Pace)
  setupTileGroup('group-tile-group', (val) => state.wizardData.group = val);
  setupTileGroup('pace-tile-group', (val) => state.wizardData.pace = val);

  // Wizard Navigation Buttons
  const nextBtn = document.getElementById('wizard-next-btn');
  const prevBtn = document.getElementById('wizard-prev-btn');

  nextBtn.addEventListener('click', () => {
    if (state.wizardStep === 1 && !state.wizardData.destId) {
      showToast('Please select a travel destination first 📍');
      return;
    }

    if (state.wizardStep < 4) {
      setWizardStep(state.wizardStep + 1);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (state.wizardStep > 1) {
      setWizardStep(state.wizardStep - 1);
    }
  });

  // Generate Itinerary CTA
  document.getElementById('generate-itinerary-btn').addEventListener('click', () => {
    generateSmartItinerary();
  });
}

function setupTileGroup(containerId, callback) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const tiles = container.querySelectorAll('.option-tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      tiles.forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');
      const val = tile.getAttribute('data-value');
      callback(val);
    });
  });
}

function setWizardStep(stepNum) {
  state.wizardStep = stepNum;
  
  // Update step indicators
  document.querySelectorAll('.step-indicator').forEach((ind, idx) => {
    const s = idx + 1;
    if (s === stepNum) {
      ind.className = 'step-indicator active';
    } else if (s < stepNum) {
      ind.className = 'step-indicator completed';
    } else {
      ind.className = 'step-indicator';
    }
  });

  // Show active step content
  document.querySelectorAll('.wizard-content-step').forEach((el, idx) => {
    el.classList.toggle('active', (idx + 1) === stepNum);
  });

  // Footer Buttons
  const prevBtn = document.getElementById('wizard-prev-btn');
  const nextBtn = document.getElementById('wizard-next-btn');
  
  prevBtn.style.display = stepNum > 1 ? 'inline-flex' : 'none';
  nextBtn.style.display = stepNum < 4 ? 'inline-flex' : 'none';

  // Step 4 Summary population
  if (stepNum === 4) {
    const dest = state.destinations.find(d => d.id === state.wizardData.destId);
    document.getElementById('wizard-summary-box').innerHTML = `
      <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--primary);">
        <i class="fa-solid fa-check-circle"></i> Trip Summary Overview
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.95rem;">
        <div><strong>Destination:</strong> ${dest ? dest.name + ', ' + dest.country : ''}</div>
        <div><strong>Dates:</strong> ${state.wizardData.startDate} to ${state.wizardData.endDate}</div>
        <div><strong>Duration:</strong> ${state.wizardData.durationDays} Days</div>
        <div><strong>Travel Group:</strong> ${state.wizardData.group}</div>
        <div><strong>Daily Pace:</strong> ${state.wizardData.pace}</div>
        <div><strong>Est. Daily Budget:</strong> ${dest ? formatPrice(dest.avgCostPerDay) : ''}</div>
      </div>
    `;
  }
}

function openPlannerForDestination(destId) {
  switchTab('planner');
  state.wizardData.destId = destId;
  const select = document.getElementById('wizard-dest-select');
  if (select) {
    select.value = destId;
    select.dispatchEvent(new Event('change'));
  }

  // Show Wizard Step 1
  document.getElementById('planner-wizard-container').style.display = 'block';
  document.getElementById('itinerary-canvas-container').style.display = 'none';
  setWizardStep(1);
}

// ==========================================================================
// Smart Itinerary Synthesis Algorithm
// ==========================================================================
function generateSmartItinerary() {
  const { destId, startDate, endDate, durationDays, group, pace } = state.wizardData;
  const dest = state.destinations.find(d => d.id === destId);
  if (!dest) return;

  // Algorithm: Allocate destination attractions across days
  const attractions = [...dest.attractions];
  
  // Spots per day count based on pace
  const spotsPerDay = pace === 'Relaxed' ? 2 : (pace === 'Fast-Paced' ? 4 : 3);
  
  const days = [];
  const timeslots = ['09:30 AM', '01:30 PM', '05:00 PM', '07:30 PM'];

  for (let i = 1; i <= durationDays; i++) {
    const dayActivities = [];
    const daySpotsCount = Math.min(spotsPerDay, attractions.length > 0 ? attractions.length : 2);

    for (let s = 0; s < daySpotsCount; s++) {
      if (attractions.length > 0) {
        // Pick top attraction or cycle
        const item = attractions.shift();
        dayActivities.push({
          ...item,
          timeSlot: timeslots[s % timeslots.length]
        });
      } else {
        // Reuse or insert leisure activity if attractions run out
        dayActivities.push({
          id: `${dest.id}-leisure-${i}-${s}`,
          name: s === 0 ? 'Local Cafe & Neighborhood Stroll' : 'Sunset View & Local Culinary Dinner',
          category: s === 0 ? 'Culture' : 'Food',
          duration: '2 hours',
          cost: 25,
          rating: 4.8,
          lat: dest.lat + (Math.random() - 0.5) * 0.02,
          lng: dest.lng + (Math.random() - 0.5) * 0.02,
          image: dest.thumbImage,
          timeSlot: timeslots[s % timeslots.length],
          description: 'Explore charming streets, sample artisanal coffee or local wine.'
        });
      }
    }

    days.push({
      dayNum: i,
      title: i === 1 ? 'Arrival & Landmark Tour' : (i === durationDays ? 'Highlights & Farewell' : `Day ${i}: Cultural Immersion`),
      activities: dayActivities
    });
  }

  // Create Active Trip Object
  state.activeTrip = {
    id: `trip-${Date.now()}`,
    title: `${dest.name} ${group} Tour`,
    destId: dest.id,
    destName: dest.name,
    destCountry: dest.country,
    startDate,
    endDate,
    numDays: durationDays,
    group,
    pace,
    days
  };

  // Switch display from wizard to canvas studio
  document.getElementById('planner-wizard-container').style.display = 'none';
  document.getElementById('itinerary-canvas-container').style.display = 'block';

  state.activeDayNum = 1;
  renderItineraryStudio();

  // Trigger celebration confetti
  if (window.confetti) {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  }

  showToast(`✨ Smart Travel Blueprint generated for ${dest.name}!`);
}

// ==========================================================================
// Itinerary Canvas Studio & Interactive Map
// ==========================================================================
function renderItineraryStudio() {
  const trip = state.activeTrip;
  if (!trip) return;

  // Title & Dates
  document.getElementById('canvas-trip-title').querySelector('span').innerText = trip.title;
  document.getElementById('canvas-trip-dates').innerText = `${trip.startDate} - ${trip.endDate} • ${trip.numDays} Days • ${trip.group} • ${trip.pace} Pace`;

  // Render Day Tabs
  const dayTabsContainer = document.getElementById('itinerary-day-tabs');
  let tabsHTML = `<button class="day-tab-btn ${state.activeDayNum === 'all' ? 'active' : ''}" data-day="all">All Days</button>`;
  
  for (let i = 1; i <= trip.numDays; i++) {
    tabsHTML += `<button class="day-tab-btn ${state.activeDayNum === i ? 'active' : ''}" data-day="${i}">Day ${i}</button>`;
  }
  dayTabsContainer.innerHTML = tabsHTML;

  dayTabsContainer.querySelectorAll('.day-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const d = btn.getAttribute('data-day');
      state.activeDayNum = d === 'all' ? 'all' : parseInt(d);
      renderItineraryStudio();
    });
  });

  // Render Timeline Activities & Calculate Stats
  renderTimelineList();

  // Initialize or Update Leaflet Map
  renderLeafletMap();

  // Toolbar Actions
  setupCanvasToolbarActions();
}

function renderTimelineList() {
  const container = document.getElementById('timeline-activity-list');
  const trip = state.activeTrip;
  if (!container || !trip) return;

  container.innerHTML = '';
  let totalCost = 0;
  let totalSpots = 0;

  const daysToRender = state.activeDayNum === 'all' 
    ? trip.days 
    : trip.days.filter(d => d.dayNum === state.activeDayNum);

  daysToRender.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.style.cssText = 'font-weight: 700; font-size: 1rem; color: var(--primary); margin: 1rem 0 0.75rem; display: flex; align-items: center; gap: 0.5rem;';
    dayHeader.innerHTML = `<i class="fa-solid fa-calendar-day"></i> Day ${day.dayNum}: ${day.title}`;
    container.appendChild(dayHeader);

    day.activities.forEach((act, actIdx) => {
      totalCost += act.cost || 0;
      totalSpots++;

      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="activity-card">
          <div class="activity-header">
            <div>
              <span class="activity-time-badge"><i class="fa-regular fa-clock"></i> ${act.timeSlot}</span>
              <h4 class="activity-title">${act.name}</h4>
            </div>
            <div class="activity-actions">
              <button class="btn-icon-sm move-up-btn" title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
              <button class="btn-icon-sm move-down-btn" title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
              <button class="btn-icon-sm remove-act-btn" title="Remove Activity"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
          <div class="activity-meta">
            <span><i class="fa-solid fa-tag"></i> ${act.category}</span>
            <span><i class="fa-solid fa-hourglass-half"></i> ${act.duration}</span>
            <span style="font-weight: 700; color: var(--primary);">${act.cost > 0 ? formatPrice(act.cost) : 'Free Entry'}</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${act.description || ''}</p>
        </div>
      `;

      // Actions logic
      item.querySelector('.move-up-btn').addEventListener('click', () => moveActivity(day.dayNum, actIdx, -1));
      item.querySelector('.move-down-btn').addEventListener('click', () => moveActivity(day.dayNum, actIdx, 1));
      item.querySelector('.remove-act-btn').addEventListener('click', () => removeActivity(day.dayNum, actIdx));

      container.appendChild(item);
    });
  });

  // Calculate stats for entire trip
  let grandTotalCost = 0;
  let grandTotalSpots = 0;
  trip.days.forEach(d => {
    d.activities.forEach(a => {
      grandTotalCost += a.cost || 0;
      grandTotalSpots++;
    });
  });

  document.getElementById('stat-total-cost').innerText = formatPrice(grandTotalCost);
  document.getElementById('stat-total-spots').innerText = grandTotalSpots;
}

function moveActivity(dayNum, idx, direction) {
  const day = state.activeTrip.days.find(d => d.dayNum === dayNum);
  if (!day) return;
  const targetIdx = idx + direction;
  if (targetIdx < 0 || targetIdx >= day.activities.length) return;

  // Swap
  const temp = day.activities[idx];
  day.activities[idx] = day.activities[targetIdx];
  day.activities[targetIdx] = temp;

  renderItineraryStudio();
}

function removeActivity(dayNum, idx) {
  const day = state.activeTrip.days.find(d => d.dayNum === dayNum);
  if (!day) return;
  day.activities.splice(idx, 1);
  renderItineraryStudio();
  showToast('Activity removed from day plan');
}

// ==========================================================================
// Leaflet Map Controller
// ==========================================================================
function renderLeafletMap() {
  const dest = state.destinations.find(d => d.id === state.activeTrip.destId);
  if (!dest) return;

  // Initialize Map if not existing
  if (!state.map) {
    state.map = L.map('map', {
      center: [dest.lat, dest.lng],
      zoom: 13,
      zoomControl: true
    });

    // OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(state.map);

    state.markersLayer = L.layerGroup().addTo(state.map);
    state.polylineLayer = L.layerGroup().addTo(state.map);
  } else {
    state.map.setView([dest.lat, dest.lng], 13);
  }

  // Clear previous layers
  state.markersLayer.clearLayers();
  state.polylineLayer.clearLayers();

  // Gather active locations
  const locations = [];
  const daysToRender = state.activeDayNum === 'all' 
    ? state.activeTrip.days 
    : state.activeTrip.days.filter(d => d.dayNum === state.activeDayNum);

  const routeCoords = [];

  daysToRender.forEach(day => {
    day.activities.forEach((act, idx) => {
      if (act.lat && act.lng) {
        const pinIcon = L.divIcon({
          className: 'custom-pin-wrapper',
          html: `<div class="custom-map-pin">${idx + 1}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([act.lat, act.lng], { icon: pinIcon });
        marker.bindPopup(`
          <div style="font-family: var(--font-family); max-width: 180px;">
            <img src="${act.image}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 6px; margin-bottom: 0.4rem;">
            <strong style="font-size: 0.9rem;">${act.name}</strong>
            <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.2rem;">${act.timeSlot} • ${act.category}</div>
          </div>
        `);

        state.markersLayer.addLayer(marker);
        routeCoords.push([act.lat, act.lng]);
        locations.push(act);
      }
    });
  });

  // Draw polyline connecting stops
  if (routeCoords.length > 1) {
    const polyline = L.polyline(routeCoords, {
      color: '#0d9488',
      weight: 4,
      dashArray: '8, 8',
      opacity: 0.85
    });
    state.polylineLayer.addLayer(polyline);

    state.map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
  }

  document.getElementById('map-pin-count').innerText = `Showing ${locations.length} pin location${locations.length > 1 ? 's' : ''}`;
  
  // Invalidate map size to handle tab switching layout calculations
  setTimeout(() => state.map && state.map.invalidateSize(), 300);
}

// ==========================================================================
// Canvas Toolbar Actions & Exports
// ==========================================================================
function setupCanvasToolbarActions() {
  // Title editing
  document.getElementById('edit-trip-title-btn').onclick = () => {
    const newTitle = prompt('Enter new trip title:', state.activeTrip.title);
    if (newTitle && newTitle.trim()) {
      state.activeTrip.title = newTitle.trim();
      document.getElementById('canvas-trip-title').querySelector('span').innerText = state.activeTrip.title;
      showToast('Trip title updated!');
    }
  };

  // Re-plan Wizard
  document.getElementById('replan-wizard-btn').onclick = () => {
    document.getElementById('planner-wizard-container').style.display = 'block';
    document.getElementById('itinerary-canvas-container').style.display = 'none';
  };

  // Packing Checklist
  document.getElementById('open-packing-btn').onclick = () => {
    openPackingModal();
  };

  // PDF Export
  document.getElementById('export-pdf-btn').onclick = () => {
    window.print();
  };

  // Share
  document.getElementById('share-trip-btn').onclick = () => {
    const shareInput = document.getElementById('share-link-input');
    shareInput.value = `${window.location.origin}${window.location.pathname}#planner?tripId=${state.activeTrip.id}`;
    openModal('share-modal');
  };

  document.getElementById('copy-share-btn').onclick = () => {
    const shareInput = document.getElementById('share-link-input');
    shareInput.select();
    navigator.clipboard.writeText(shareInput.value);
    showToast('Share link copied to clipboard! 📋');
  };

  // Save Trip
  document.getElementById('save-trip-btn').onclick = () => {
    saveCurrentTrip();
  };

  // Add attraction modal trigger
  document.getElementById('add-attraction-btn').onclick = () => {
    openAddAttractionModal();
  };
}

async function saveCurrentTrip() {
  if (!state.activeTrip) return;
  
  // Check if trip exists locally
  const existingIdx = state.savedTrips.findIndex(t => t.id === state.activeTrip.id);
  if (existingIdx >= 0) {
    state.savedTrips[existingIdx] = state.activeTrip;
  } else {
    state.savedTrips.push(state.activeTrip);
  }

  localStorage.setItem('smart_tour_saved_trips', JSON.stringify(state.savedTrips));
  updateSavedBadge();

  // If user is authenticated, save trip to REST API backend database
  if (state.token) {
    try {
      const res = await fetch(`${API_BASE}/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify(state.activeTrip)
      });
      if (res.ok) {
        showToast('☁️ Trip Blueprint synced to your cloud account!');
        return;
      }
    } catch (e) {
      console.log('Failed to sync trip to server:', e.message);
    }
  }

  showToast('💾 Trip Blueprint saved to profile!');
}

function updateSavedBadge() {
  const badge = document.getElementById('saved-count-badge');
  if (badge) {
    badge.innerText = state.savedTrips.length;
  }
}

// ==========================================================================
// Saved Trips View
// ==========================================================================
function renderSavedTrips() {
  const grid = document.getElementById('saved-trips-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (state.savedTrips.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <i class="fa-regular fa-bookmark" style="font-size: 3.5rem; margin-bottom: 1rem; color: var(--border-color);"></i>
        <h3>No saved trips yet</h3>
        <p>Use the Smart Planner to design and save your travel blueprints!</p>
        <button class="btn-primary" style="margin-top: 1rem;" onclick="switchTab('destinations')">Explore Destinations</button>
      </div>
    `;
    return;
  }

  state.savedTrips.forEach(trip => {
    const dest = state.destinations.find(d => d.id === trip.destId) || state.destinations[0];
    const card = document.createElement('div');
    card.className = 'destination-card';

    card.innerHTML = `
      <div class="card-image-wrap">
        <img src="${dest.thumbImage}" alt="${trip.title}">
        <div class="card-badge"><i class="fa-solid fa-bookmark"></i> ${trip.numDays} Days</div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${trip.title}</h3>
        <p class="card-tagline">${trip.startDate} - ${trip.endDate} • ${trip.group}</p>
        <div class="card-footer">
          <button class="btn-primary btn-card-action load-saved-btn">
            <i class="fa-solid fa-folder-open"></i> Open Plan
          </button>
          <button class="btn-secondary btn-card-action delete-saved-btn" style="color: #ef4444;">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;

    card.querySelector('.load-saved-btn').addEventListener('click', () => {
      state.activeTrip = trip;
      switchTab('planner');
      document.getElementById('planner-wizard-container').style.display = 'none';
      document.getElementById('itinerary-canvas-container').style.display = 'block';
      state.activeDayNum = 1;
      renderItineraryStudio();
    });

    card.querySelector('.delete-saved-btn').addEventListener('click', async () => {
      if (confirm(`Delete saved trip "${trip.title}"?`)) {
        state.savedTrips = state.savedTrips.filter(t => t.id !== trip.id);
        localStorage.setItem('smart_tour_saved_trips', JSON.stringify(state.savedTrips));
        updateSavedBadge();

        if (state.token) {
          try {
            await fetch(`${API_BASE}/trips/${trip.id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${state.token}` }
            });
          } catch (e) {
            console.log('Error deleting trip from server:', e.message);
          }
        }

        renderSavedTrips();
        showToast('Saved trip deleted');
      }
    });

    grid.appendChild(card);
  });
}

// ==========================================================================
// Add Attraction Modal
// ==========================================================================
function openAddAttractionModal() {
  const dest = state.destinations.find(d => d.id === state.activeTrip.destId);
  const container = document.getElementById('available-attractions-list');
  if (!dest || !container) return;

  container.innerHTML = dest.attractions.map(att => `
    <div style="display: flex; gap: 1rem; align-items: center; background: var(--bg-main); padding: 0.75rem; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
      <img src="${att.image}" style="width: 60px; height: 50px; object-fit: cover; border-radius: 6px;">
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 0.9rem;">${att.name}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">${att.category} • Est. ${formatPrice(att.cost)}</div>
      </div>
      <button class="btn-primary add-this-att-btn" data-id="${att.id}" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
        + Add
      </button>
    </div>
  `).join('');

  container.querySelectorAll('.add-this-att-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const attId = btn.getAttribute('data-id');
      const attObj = dest.attractions.find(a => a.id === attId);
      if (attObj) {
        const activeDayIndex = typeof state.activeDayNum === 'number' ? state.activeDayNum - 1 : 0;
        state.activeTrip.days[activeDayIndex].activities.push({
          ...attObj,
          timeSlot: '03:30 PM'
        });
        closeModal('add-activity-modal');
        renderItineraryStudio();
        showToast(`Added ${attObj.name} to Day ${activeDayIndex + 1}!`);
      }
    });
  });

  openModal('add-activity-modal');
}

// ==========================================================================
// Smart Packing Checklist Modal
// ==========================================================================
function openPackingModal() {
  const container = document.getElementById('packing-items-list');
  if (!container) return;

  // Build list from defaults
  const items = [
    ...PACKING_ITEMS_BY_CATEGORY.general,
    ...PACKING_ITEMS_BY_CATEGORY.warm
  ];

  container.innerHTML = items.map((item, idx) => `
    <label style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.95rem; cursor: pointer; background: var(--bg-main); padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid var(--border-color);">
      <input type="checkbox" id="pack-${idx}" style="width: 18px; height: 18px; accent-color: var(--primary);">
      <span>${item}</span>
    </label>
  `).join('');

  document.getElementById('add-packing-item-btn').onclick = () => {
    const input = document.getElementById('new-packing-item-input');
    const val = input.value.trim();
    if (val) {
      const newLabel = document.createElement('label');
      newLabel.style.cssText = 'display: flex; align-items: center; gap: 0.75rem; font-size: 0.95rem; cursor: pointer; background: var(--bg-main); padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid var(--border-color);';
      newLabel.innerHTML = `<input type="checkbox" checked style="width: 18px; height: 18px; accent-color: var(--primary);"> <span>${val}</span>`;
      container.appendChild(newLabel);
      input.value = '';
    }
  };

  openModal('packing-modal');
}

// ==========================================================================
// Travel Quiz Modal Logic
// ==========================================================================
function initQuiz() {
  document.getElementById('open-quiz-btn').addEventListener('click', () => {
    state.quizStep = 0;
    state.quizAnswers = {};
    renderQuizStep();
    openModal('quiz-modal');
  });
}

function renderQuizStep() {
  const container = document.getElementById('quiz-modal-body');
  if (!container) return;

  if (state.quizStep < TRAVEL_QUIZ.length) {
    const q = TRAVEL_QUIZ[state.quizStep];
    container.innerHTML = `
      <div style="margin-bottom: 1rem; font-size: 0.85rem; font-weight: 700; color: var(--primary);">
        Question ${state.quizStep + 1} of ${TRAVEL_QUIZ.length}
      </div>
      <h3 style="font-size: 1.25rem; margin-bottom: 1.5rem;">${q.question}</h3>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        ${q.options.map((opt, idx) => `
          <button class="btn-secondary quiz-opt-btn" data-idx="${idx}" style="text-align: left; padding: 1rem; justify-content: flex-start;">
            ${opt.text}
          </button>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        const chosen = q.options[idx];
        if (chosen.match) state.quizAnswers.match = chosen.match;
        state.quizStep++;
        renderQuizStep();
      });
    });
  } else {
    // Show Quiz Results
    const recommendedDestId = state.quizAnswers.match || 'paris';
    const dest = state.destinations.find(d => d.id === recommendedDestId);

    container.innerHTML = `
      <div style="text-align: center; padding: 1rem 0;">
        <i class="fa-solid fa-trophy" style="font-size: 3rem; color: #f59e0b; margin-bottom: 1rem;"></i>
        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Your Recommended Destination:</h3>
        <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 1rem;">${dest.name}, ${dest.country}</h2>
        <img src="${dest.thumbImage}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--border-radius-md); margin-bottom: 1rem;">
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">${dest.description}</p>
        <button class="btn-primary" id="quiz-plan-recommended-btn" style="width: 100%; justify-content: center; padding: 0.9rem;">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Plan Trip to ${dest.name} Now
        </button>
      </div>
    `;

    document.getElementById('quiz-plan-recommended-btn').addEventListener('click', () => {
      closeModal('quiz-modal');
      openPlannerForDestination(dest.id);
    });
  }
}

// ==========================================================================
// Modal Helpers & Toasts
// ==========================================================================
function initModals() {
  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-close');
      closeModal(targetId);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--primary);"></i> <span>${message}</span>`;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// Backend API Integration & User Authentication (Hybrid REST API + Fallback)
// ==========================================================================
const API_BASE = 'http://localhost:5000/api';

state.token = localStorage.getItem('smart_tour_token') || null;
state.user = state.token ? (JSON.parse(localStorage.getItem('smart_tour_user_profile')) || null) : null;
if (!state.token) {
  localStorage.removeItem('smart_tour_user_profile');
}

// Local Auth storage helpers for static deployment (GitHub Pages fallback)
function getLocalUsers() {
  return JSON.parse(localStorage.getItem('smart_tour_users')) || [];
}

function saveLocalUsers(users) {
  localStorage.setItem('smart_tour_users', JSON.stringify(users));
}

function localAuthLogin(email, password) {
  const users = getLocalUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    // If no user exists, create one on the fly for quick guest/demo sign in
    const newUser = {
      id: 'user_' + Date.now(),
      name: email.split('@')[0] || 'Traveler',
      email: email.toLowerCase().trim(),
      password: password
    };
    users.push(newUser);
    saveLocalUsers(users);
    return { token: 'local_token_' + Date.now(), user: { id: newUser.id, name: newUser.name, email: newUser.email } };
  }

  if (user.password !== password) {
    throw new Error('Incorrect password');
  }

  return { token: 'local_token_' + Date.now(), user: { id: user.id, name: user.name, email: user.email } };
}

function localAuthRegister(name, email, password) {
  const users = getLocalUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    throw new Error('User with this email already exists. Please Sign In.');
  }

  const newUser = {
    id: 'user_' + Date.now(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password
  };

  users.push(newUser);
  saveLocalUsers(users);
  return { token: 'local_token_' + Date.now(), user: { id: newUser.id, name: newUser.name, email: newUser.email } };
}

async function fetchBackendData() {
  // Fetch Destinations from REST API (with local fallback)
  try {
    const res = await fetch(`${API_BASE}/destinations`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      if (data.destinations && data.destinations.length > 0) {
        state.destinations = data.destinations;
        renderFeaturedDestinations();
        renderAllDestinations();
      }
    }
  } catch (e) {
    console.log('Using local destinations data');
  }

  // Restore User session if token exists
  if (state.token) {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { 'Authorization': `Bearer ${state.token}` },
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        const data = await res.json();
        state.user = data.user;
        localStorage.setItem('smart_tour_user_profile', JSON.stringify(state.user));
      } else if (res.status === 401 || res.status === 403 || res.status === 404) {
        // Token is expired or invalid - clear session
        state.token = null;
        state.user = null;
        localStorage.removeItem('smart_tour_token');
        localStorage.removeItem('smart_tour_user_profile');
      }
    } catch (e) {
      console.log('Backend offline or using local session token');
    }
  }

  updateUserUI();
}

function initAuthUI() {
  const authNavBtn = document.getElementById('auth-nav-btn');
  const tabLoginBtn = document.getElementById('tab-login-btn');
  const tabRegisterBtn = document.getElementById('tab-register-btn');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const logoutBtn = document.getElementById('logout-btn');
  const viewSavedProfileBtn = document.getElementById('view-saved-profile-btn');
  const demoLoginBtn = document.getElementById('demo-login-btn');

  if (authNavBtn) {
    authNavBtn.addEventListener('click', () => {
      hideAuthError();
      updateUserUI();
      openModal('auth-modal');
    });
  }

  if (demoLoginBtn) {
    demoLoginBtn.addEventListener('click', () => {
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      if (emailInput) emailInput.value = 'demo@smarttour.com';
      if (passInput) passInput.value = 'demo123456';
      if (loginForm) {
        if (typeof loginForm.requestSubmit === 'function') {
          loginForm.requestSubmit();
        } else {
          loginForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }
    });
  }

  if (tabLoginBtn && tabRegisterBtn) {
    tabLoginBtn.addEventListener('click', () => {
      tabLoginBtn.classList.add('active');
      tabLoginBtn.style.color = 'var(--primary)';
      tabLoginBtn.style.borderBottom = '2px solid var(--primary)';
      tabRegisterBtn.classList.remove('active');
      tabRegisterBtn.style.color = 'var(--text-muted)';
      tabRegisterBtn.style.borderBottom = 'none';

      if (loginForm) loginForm.style.display = 'block';
      if (registerForm) registerForm.style.display = 'none';
      hideAuthError();
    });

    tabRegisterBtn.addEventListener('click', () => {
      tabRegisterBtn.classList.add('active');
      tabRegisterBtn.style.color = 'var(--primary)';
      tabRegisterBtn.style.borderBottom = '2px solid var(--primary)';
      tabLoginBtn.classList.remove('active');
      tabLoginBtn.style.color = 'var(--text-muted)';
      tabLoginBtn.style.borderBottom = 'none';

      if (registerForm) registerForm.style.display = 'block';
      if (loginForm) loginForm.style.display = 'none';
      hideAuthError();
    });
  }

  // Handle Login Submit
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideAuthError();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      let authResult = null;

      // Try Backend REST API first
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          signal: AbortSignal.timeout(2500)
        });
        const data = await res.json();
        if (res.ok) {
          authResult = data;
        } else {
          // If backend returns credentials error, check local storage auth fallback
          try {
            authResult = localAuthLogin(email, password);
          } catch (localErr) {
            showAuthError(data.error || localErr.message || 'Invalid email or password');
            return;
          }
        }
      } catch (err) {
        // Fallback to local authentication for static host / offline
        try {
          authResult = localAuthLogin(email, password);
        } catch (localErr) {
          showAuthError(localErr.message);
          return;
        }
      }

      if (authResult) {
        state.token = authResult.token;
        state.user = authResult.user;
        localStorage.setItem('smart_tour_token', authResult.token);
        localStorage.setItem('smart_tour_user_profile', JSON.stringify(authResult.user));

        updateUserUI();
        syncUserTripsFromBackend();
        closeModal('auth-modal');
        showToast(`Welcome back, ${state.user.name}! 🎉`);
      }
    });
  }

  // Handle Register Submit
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideAuthError();
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;

      let authResult = null;

      // Try Backend REST API first
      try {
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
          signal: AbortSignal.timeout(2500)
        });
        const data = await res.json();
        if (res.ok) {
          authResult = data;
        } else {
          showAuthError(data.error || 'Registration failed');
          return;
        }
      } catch (err) {
        // Fallback to local authentication for static host / offline
        try {
          authResult = localAuthRegister(name, email, password);
        } catch (localErr) {
          showAuthError(localErr.message);
          return;
        }
      }

      if (authResult) {
        state.token = authResult.token;
        state.user = authResult.user;
        localStorage.setItem('smart_tour_token', authResult.token);
        localStorage.setItem('smart_tour_user_profile', JSON.stringify(authResult.user));

        updateUserUI();
        closeModal('auth-modal');
        showToast(`Account created! Welcome, ${state.user.name}! 🚀`);
      }
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('smart_tour_token');
      localStorage.removeItem('smart_tour_user_profile');
      updateUserUI();
      closeModal('auth-modal');
      showToast('Successfully signed out 👋');
    });
  }

  if (viewSavedProfileBtn) {
    viewSavedProfileBtn.addEventListener('click', () => {
      closeModal('auth-modal');
      switchTab('saved');
    });
  }
}

function showAuthError(msg) {
  const errDiv = document.getElementById('auth-error-msg');
  if (errDiv) {
    errDiv.textContent = msg;
    errDiv.style.display = 'block';
  }
}

function hideAuthError() {
  const errDiv = document.getElementById('auth-error-msg');
  if (errDiv) errDiv.style.display = 'none';
}

function updateUserUI() {
  const authBtnText = document.getElementById('auth-btn-text');
  const authUserIcon = document.getElementById('auth-user-icon');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const userProfileView = document.getElementById('user-profile-view');
  const authTabs = document.querySelector('.auth-tabs');
  const modalTitle = document.getElementById('auth-modal-title');

  if (state.user) {
    if (authBtnText) authBtnText.textContent = state.user.name.split(' ')[0];
    if (authUserIcon) authUserIcon.className = 'fa-solid fa-user-check';
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'none';
    if (authTabs) authTabs.style.display = 'none';
    if (userProfileView) userProfileView.style.display = 'block';

    const profileName = document.getElementById('profile-user-name');
    const profileEmail = document.getElementById('profile-user-email');
    if (profileName) profileName.textContent = state.user.name;
    if (profileEmail) profileEmail.textContent = state.user.email;
    if (modalTitle) modalTitle.textContent = 'Account Profile';
  } else {
    if (authBtnText) authBtnText.textContent = 'Sign In';
    if (authUserIcon) authUserIcon.className = 'fa-solid fa-user-circle';
    if (loginForm) loginForm.style.display = 'block';
    if (registerForm) registerForm.style.display = 'none';
    if (authTabs) authTabs.style.display = 'flex';
    if (userProfileView) userProfileView.style.display = 'none';
    if (modalTitle) modalTitle.textContent = 'Account Access';
  }
}

async function syncUserTripsFromBackend() {
  if (!state.token) return;

  try {
    const res = await fetch(`${API_BASE}/trips`, {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.trips) {
        state.savedTrips = data.trips;
        localStorage.setItem('smart_tour_saved_trips', JSON.stringify(state.savedTrips));
        updateSavedBadge();
        if (state.currentTab === 'saved') {
          renderSavedTripsView();
        }
      }
    }
  } catch (e) {
    console.log('Could not sync trips from backend:', e.message);
  }
}
