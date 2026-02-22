// Debug version of app.js
// Added console logging to diagnose issues

let map;
let markers = [];
let currentTypeFilter = 'all';
let currentCityFilter = 'all';
let currentDate = new Date();

console.log('=== APP.JS LOADED ===');
console.log('Current date:', currentDate);

// City configurations for zooming
const cityConfigs = {
    'all': {
        center: [35, -95],
        zoom: 3,
        bounds: [[25, -125], [50, -65]]
    },
    'New York': {
        center: [40.7128, -74.0060],
        zoom: 12,
        bounds: [[40.6, -74.2], [40.9, -73.8]]
    },
    'Los Angeles': {
        center: [34.0522, -118.2437],
        zoom: 11,
        bounds: [[33.8, -118.5], [34.4, -118.0]]
    },
    'Chicago': {
        center: [41.8781, -87.6298],
        zoom: 11,
        bounds: [[41.6, -88.0], [42.1, -87.3]]
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

// Convert exhibition data to events format
function convertExhibitionsToEvents() {
    console.log('=== convertExhibitionsToEvents called ===');
    const events = [];
    
    if (!EXHIBITION_DATA || !EXHIBITION_DATA.cities) {
        console.warn('No exhibition data available');
        return events;
    }
    
    console.log('EXHIBITION_DATA found, cities:', Object.keys(EXHIBITION_DATA.cities));
    
    for (const [cityName, cityData] of Object.entries(EXHIBITION_DATA.cities)) {
        console.log(`Processing ${cityName}:`, cityData.exhibitions ? cityData.exhibitions.length : 0, 'exhibitions');
        if (cityData.exhibitions) {
            for (const ex of cityData.exhibitions) {
                const location = getApproximateLocation(cityName, ex.district);
                
                events.push({
                    id: ex.id,
                    title: ex.title,
                    titleCn: ex.title,
                    artist: ex.artist,
                    venue: ex.gallery,
                    venueCn: ex.gallery,
                    city: cityName,
                    district: ex.district,
                    date: ex.startDate,
                    endDate: ex.endDate,
                    type: ex.type,
                    description: ex.description,
                    location: location,
                    website: ex.website,
                    verified: ex.verified
                });
            }
        }
    }
    
    console.log('Total events created:', events.length);
    return events;
}

// Get approximate coordinates for districts
function getApproximateLocation(city, district) {
    const baseCoords = {
        'New York': [40.7128, -74.0060],
        'Los Angeles': [34.0522, -118.2437],
        'Chicago': [41.8781, -87.6298],
        'Beijing': [39.9042, 116.4074],
        'Shanghai': [31.2304, 121.4737],
        'Hong Kong': [22.3193, 114.1694]
    };
    
    const base = baseCoords[city] || [0, 0];
    const offset = (Math.random() - 0.5) * 0.04;
    return [base[0] + offset, base[1] + offset];
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOMContentLoaded ===');
    console.log('EXHIBITION_DATA exists:', typeof EXHIBITION_DATA !== 'undefined');
    
    initMap();
    setupEventListeners();
    updateDisplay();
    
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'none';
    }, 500);
});

// Initialize Leaflet map
function initMap() {
    console.log('=== initMap called ===');
    const config = cityConfigs[currentCityFilter];
    
    map = L.map('map', {
        center: config.center,
        zoom: config.zoom,
        minZoom: 2,
        maxZoom: 18,
        scrollWheelZoom: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    if (currentCityFilter === 'all') {
        map.fitBounds(config.bounds, { padding: [50, 50] });
    }
}

// Setup event listeners
function setupEventListeners() {
    console.log('=== setupEventListeners called ===');
    
    document.querySelectorAll('.filter-btn[data-type]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn[data-type]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTypeFilter = this.dataset.type;
            console.log('Type filter changed to:', currentTypeFilter);
            updateDisplay();
        });
    });

    document.querySelectorAll('.filter-btn[data-city]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn[data-city]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCityFilter = this.dataset.city;
            console.log('City filter changed to:', currentCityFilter);
            zoomToCity(currentCityFilter);
            updateDisplay();
        });
    });

    const timeline = document.getElementById('timeline');
    if (timeline) {
        timeline.addEventListener('input', function() {
            const daysOffset = parseInt(this.value) - 30;
            currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + daysOffset);
            updateDateDisplay();
            updateDisplay();
        });
    }
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
    const dateEl = document.getElementById('currentDate');
    if (dateEl) {
        dateEl.textContent = dateStr;
    }
}

// Update all displays
function updateDisplay() {
    console.log('=== updateDisplay called ===');
    updateMarkers();
    updateStats();
}

// Update map markers
function updateMarkers() {
    console.log('=== updateMarkers called ===');
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    const artEvents = convertExhibitionsToEvents();
    console.log('artEvents count:', artEvents.length);
    
    if (artEvents.length === 0) {
        console.log('No events to display');
        return;
    }

    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 30);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 90);

    console.log('Date range:', startDate, 'to', endDate);

    const filteredEvents = artEvents.filter(event => {
        const eventStart = new Date(event.date);
        const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;
        const inRange = (eventStart <= endDate && eventEnd >= startDate);
        const typeMatch = currentTypeFilter === 'all' || event.type === currentTypeFilter;
        const cityMatch = currentCityFilter === 'all' || event.city === currentCityFilter;
        
        if (cityMatch && typeMatch) {
            console.log('Event:', event.title, 'inRange:', inRange, 'dates:', event.date, '-', event.endDate);
        }
        
        return inRange && typeMatch && cityMatch;
    });

    console.log('Filtered events:', filteredEvents.length);

    filteredEvents.forEach(event => {
        const marker = createMarker(event);
        if (marker) {
            markers.push(marker);
            marker.addTo(map);
        }
    });
}

// Create custom marker
function createMarker(event) {
    if (!event.location || event.location[0] === 0) {
        console.log('No location for event:', event.title);
        return null;
    }
    
    const iconHtml = `<div class="marker-pin ${event.type}">${getEventIcon(event.type)}</div>`;
    
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: iconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
    });

    const marker = L.marker(event.location, { icon: customIcon });
    
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
        fair: '博',
        opportunity: '投'
    };
    return icons[type] || '●';
}

// Create popup content
function createPopupContent(event) {
    const typeLabels = {
        auction: '拍卖',
        gallery: '展览',
        fair: '艺博会',
        opportunity: '投稿机会'
    };

    const dateDisplay = event.endDate 
        ? `${formatDate(event.date)} - ${formatDate(event.endDate)}`
        : formatDate(event.date);

    const linkHtml = event.website 
        ? `<div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border);"><a href="${event.website}" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: none;">访问官网 ↗</a></div>`
        : '';
    
    const verifiedBadge = event.verified 
        ? '' 
        : '<span style="font-size: 0.7rem; color: #999; margin-left: 0.5rem;">(待验证)</span>';

    return `
        <div class="event-card">
            <span class="event-type ${event.type}">${typeLabels[event.type] || event.type}</span>
            <div class="event-title">${event.titleCn || event.title}${verifiedBadge}</div>
            <div class="event-venue">${event.venueCn || event.gallery || event.organization}</div>
            <div class="event-date">${dateDisplay}</div>
            ${event.description ? `<div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem;">${event.description.substring(0, 100)}...</div>` : ''}
            ${linkHtml}
        </div>
    `;
}

// Update statistics
function updateStats() {
    console.log('=== updateStats called ===');
    const artEvents = convertExhibitionsToEvents();
    
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 30);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 90);

    const filteredEvents = artEvents.filter(event => {
        const eventStart = new Date(event.date);
        const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;
        const inRange = (eventStart <= endDate && eventEnd >= startDate);
        const typeMatch = currentTypeFilter === 'all' || event.type === currentTypeFilter;
        const cityMatch = currentCityFilter === 'all' || event.city === currentCityFilter;
        return inRange && typeMatch && cityMatch;
    });

    const auctions = filteredEvents.filter(e => e.type === 'auction').length;
    const galleries = filteredEvents.filter(e => e.type === 'gallery').length;
    const fairs = filteredEvents.filter(e => e.type === 'fair').length;

    console.log('Stats - Total:', filteredEvents.length, 'Auctions:', auctions, 'Galleries:', galleries, 'Fairs:', fairs);

    const statTotal = document.getElementById('statTotal');
    const statAuction = document.getElementById('statAuction');
    const statGallery = document.getElementById('statGallery');
    const statFair = document.getElementById('statFair');

    if (statTotal) statTotal.textContent = filteredEvents.length;
    if (statAuction) statAuction.textContent = auctions;
    if (statGallery) statGallery.textContent = galleries;
    if (statFair) statFair.textContent = fairs;
}

// Format date helper
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric'
    });
}

console.log('=== APP.JS END ===');
