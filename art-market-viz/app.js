// Art Market Visualization App
// Main application logic

let map;
let markers = [];
let currentFilter = 'all';
let currentDate = new Date('2026-02-22');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    setupEventListeners();
    updateDisplay();
    
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 500);
});

// Initialize Leaflet map
function initMap() {
    // Center map between NYC and China
    map = L.map('map', {
        center: [45, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 18,
        scrollWheelZoom: true
    });

    // Add tile layer - using CartoDB Positron for clean, minimal look
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Fit bounds to show both NYC and China regions
    const bounds = L.latLngBounds(
        [30, -125], // Southwest
        [50, 125]   // Northeast
    );
    map.fitBounds(bounds, { padding: [50, 50] });
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.type;
            updateDisplay();
        });
    });

    // Timeline slider
    const timeline = document.getElementById('timeline');
    timeline.addEventListener('input', function() {
        const daysOffset = parseInt(this.value) - 30; // 0 = 30 days ago, 30 = today, 120 = 90 days future
        currentDate = new Date('2026-02-22');
        currentDate.setDate(currentDate.getDate() + daysOffset);
        updateDateDisplay();
        updateDisplay();
    });
}

// Update date display
function updateDateDisplay() {
    const dateStr = currentDate.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentDate').textContent = dateStr;
}

// Update all displays
function updateDisplay() {
    updateMarkers();
    updateStats();
}

// Update map markers
function updateMarkers() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Calculate date range (30 days before to 90 days after current date)
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 30);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 90);

    // Filter events
    const filteredEvents = artEvents.filter(event => {
        const eventDate = new Date(event.date);
        const inRange = eventDate >= startDate && eventDate <= endDate;
        const typeMatch = currentFilter === 'all' || event.type === currentFilter;
        return inRange && typeMatch;
    });

    // Add markers
    filteredEvents.forEach(event => {
        const marker = createMarker(event);
        markers.push(marker);
        marker.addTo(map);
    });
}

// Create custom marker
function createMarker(event) {
    const iconHtml = `<div class="marker-pin ${event.type}">${getEventIcon(event.type)}</div>`;
    
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: iconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
    });

    const marker = L.marker(event.location, { icon: customIcon });
    
    // Create popup content
    const popupContent = createPopupContent(event);
    marker.bindPopup(popupContent, {
        className: 'custom-popup',
        closeButton: true,
        closeOnClick: false
    });

    return marker;
}

// Get icon for event type
function getEventIcon(type) {
    const icons = {
        auction: '拍',
        gallery: '展',
        fair: '博'
    };
    return icons[type] || '●';
}

// Create popup content
function createPopupContent(event) {
    const typeLabels = {
        auction: '拍卖',
        gallery: '展览',
        fair: '艺博会'
    };

    const dateDisplay = event.endDate 
        ? `${formatDate(event.date)} - ${formatDate(event.endDate)}`
        : formatDate(event.date);

    return `
        <div class="event-card">
            <span class="event-type ${event.type}">${typeLabels[event.type]}</span>
            <div class="event-title">${event.titleCn}</div>
            <div class="event-venue">${event.venueCn}</div>
            <div class="event-date">${dateDisplay}</div>
            ${event.price ? `<div class="event-price">${event.price}</div>` : ''}
        </div>
    `;
}

// Update statistics
function updateStats() {
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 30);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 90);

    const filteredEvents = artEvents.filter(event => {
        const eventDate = new Date(event.date);
        const inRange = eventDate >= startDate && eventDate <= endDate;
        const typeMatch = currentFilter === 'all' || event.type === currentFilter;
        return inRange && typeMatch;
    });

    const auctions = filteredEvents.filter(e => e.type === 'auction').length;
    const galleries = filteredEvents.filter(e => e.type === 'gallery').length;
    const fairs = filteredEvents.filter(e => e.type === 'fair').length;

    document.getElementById('statTotal').textContent = filteredEvents.length;
    document.getElementById('statAuction').textContent = auctions;
    document.getElementById('statGallery').textContent = galleries;
    document.getElementById('statFair').textContent = fairs;
}

// Format date helper
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric'
    });
}

// Future enhancement: Real data fetching
async function fetchRealData() {
    // This would fetch from APIs like:
    // - Artnet API
    // - Artsy API
    // - Auction house APIs
    // - Gallery websites (scraping)
    
    console.log('Real data fetching not implemented yet');
}
