// Art Market Visualization App
// Main application logic

let map;
let markers = [];
let currentTypeFilter = 'all';
let currentCityFilter = 'New York';
let currentDate = new Date('2026-02-22');

// City configurations for zooming
const cityConfigs = {
    'all': {
        center: [45, 0],
        zoom: 2,
        bounds: [[30, -125], [50, 125]]
    },
    'New York': {
        center: [40.7128, -74.0060],
        zoom: 12,
        bounds: [[40.6, -74.2], [40.9, -73.8]]
    },
    'Beijing': {
        center: [39.9042, 116.4074],
        zoom: 11,
        bounds: [[39.7, 116.1], [40.1, 116.7]]
    },
    'Shanghai': {
        center: [31.2304, 121.4737],
        zoom: 11,
        bounds: [[31.0, 121.2], [31.5, 121.8]]
    },
    'Hong Kong': {
        center: [22.3193, 114.1694],
        zoom: 11,
        bounds: [[22.1, 113.9], [22.5, 114.4]]
    }
};

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
    const config = cityConfigs[currentCityFilter];
    
    map = L.map('map', {
        center: config.center,
        zoom: config.zoom,
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

    // Fit bounds to show selected city
    if (currentCityFilter === 'all') {
        map.fitBounds(config.bounds, { padding: [50, 50] });
    }
}

// Setup event listeners
function setupEventListeners() {
    // Type filter buttons
    document.querySelectorAll('.filter-btn.type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn.type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTypeFilter = this.dataset.type;
            updateDisplay();
        });
    });

    // City filter buttons
    document.querySelectorAll('.filter-btn.city-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn.city-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCityFilter = this.dataset.city;
            zoomToCity(currentCityFilter);
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

// Zoom to selected city
function zoomToCity(city) {
    const config = cityConfigs[city];
    if (config) {
        if (city === 'all') {
            map.flyToBounds(config.bounds, { padding: [50, 50], duration: 1.5 });
        } else {
            map.flyTo(config.center, config.zoom, { duration: 1.5 });
        }
    }
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
        const typeMatch = currentTypeFilter === 'all' || event.type === currentTypeFilter;
        const cityMatch = currentCityFilter === 'all' || event.city === currentCityFilter;
        return inRange && typeMatch && cityMatch;
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

    // Get link for this venue - try exact match first, then fallback
    let venueLink = venueLinks[event.venue];
    
    // Debug: log if link not found
    if (!venueLink) {
        console.log('No link found for venue:', event.venue);
    }
    
    const linkHtml = venueLink 
        ? `<a href="${venueLink}" target="_blank" rel="noopener noreferrer" class="event-link">访问官网 ↗</a>`
        : '';

    return `
        <div class="event-card">
            <span class="event-type ${event.type}">${typeLabels[event.type]}</span>
            <div class="event-title">${event.titleCn}</div>
            <div class="event-venue">${event.venueCn}</div>
            <div class="event-date">${dateDisplay}</div>
            ${event.price ? `<div class="event-price">${event.price}</div>` : ''}
            ${linkHtml}
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
        const typeMatch = currentTypeFilter === 'all' || event.type === currentTypeFilter;
        const cityMatch = currentCityFilter === 'all' || event.city === currentCityFilter;
        return inRange && typeMatch && cityMatch;
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

// Update links section based on selected city
function updateLinks() {
    const container = document.getElementById('linksContainer');
    if (!container) return;

    let links = [];
    
    // Get links for selected city + global links
    if (currentCityFilter === 'all') {
        // Show global links when viewing all cities
        links = referenceLinks['global'] || [];
    } else {
        // Show city-specific links + global links
        const cityLinks = referenceLinks[currentCityFilter] || [];
        const globalLinks = referenceLinks['global'] || [];
        links = [...cityLinks, ...globalLinks];
    }

    // Render links
    if (links.length === 0) {
        container.innerHTML = '<div style="font-size: 0.875rem; color: var(--text-secondary);">暂无链接</div>';
        return;
    }

    container.innerHTML = links.map(link => `
        <div class="link-item">
            <div class="link-icon"></div>
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-text">
                ${link.name}
            </a>
            <span class="link-external">↗</span>
        </div>
    `).join('');
}
