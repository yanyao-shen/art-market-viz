// Art Market Visualization App - Stable Version

let map;
let markers = [];
let currentTypeFilter = 'all';
let currentCityFilter = 'all';
let currentDate = new Date('2026-02-22');

// City configurations
const cityConfigs = {
    'all': { center: [35, -95], zoom: 3 },
    'New York': { center: [40.7128, -74.0060], zoom: 12 },
    'Los Angeles': { center: [34.0522, -118.2437], zoom: 11 },
    'Chicago': { center: [41.8781, -87.6298], zoom: 11 },
    'Beijing': { center: [39.9042, 116.4074], zoom: 11 },
    'Shanghai': { center: [31.2304, 121.4737], zoom: 11 },
    'Hong Kong': { center: [22.3193, 114.1694], zoom: 11 }
};

const cityCoords = {
    'New York': [40.7128, -74.0060],
    'Los Angeles': [34.0522, -118.2437],
    'Chicago': [41.8781, -87.6298],
    'Beijing': [39.9042, 116.4074],
    'Shanghai': [31.2304, 121.4737],
    'Hong Kong': [22.3193, 114.1694]
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    try {
        initMap();
        setupListeners();
        renderData();
        document.getElementById('loading').style.display = 'none';
    } catch (e) {
        console.error('Init error:', e);
    }
});

function initMap() {
    const cfg = cityConfigs[currentCityFilter];
    map = L.map('map', { center: cfg.center, zoom: cfg.zoom, minZoom: 2 });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(map);
}

function setupListeners() {
    document.querySelectorAll('.filter-btn[data-type]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn[data-type]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTypeFilter = this.dataset.type;
            renderData();
        });
    });

    document.querySelectorAll('.filter-btn[data-city]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn[data-city]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCityFilter = this.dataset.city;
            const cfg = cityConfigs[currentCityFilter];
            map.flyTo(cfg.center, cfg.zoom, { duration: 1 });
            renderData();
        });
    });

    const timeline = document.getElementById('timeline');
    if (timeline) {
        timeline.addEventListener('input', function() {
            const offset = parseInt(this.value) - 30;
            currentDate = new Date('2026-02-22');
            currentDate.setDate(currentDate.getDate() + offset);
            document.getElementById('currentDate').textContent = currentDate.toLocaleDateString('zh-CN');
            renderData();
        });
    }
}

function renderData() {
    // Clear markers
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    if (!window.EXHIBITION_DATA || !window.EXHIBITION_DATA.cities) {
        console.error('No data available');
        return;
    }

    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 30);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 90);

    let totalCount = 0;
    let auctionCount = 0;
    let galleryCount = 0;
    let fairCount = 0;

    // Process each city
    for (const [cityName, cityData] of Object.entries(window.EXHIBITION_DATA.cities)) {
        if (!cityData.exhibitions) continue;
        
        for (const ex of cityData.exhibitions) {
            // Date filter
            const exStart = new Date(ex.startDate);
            const exEnd = ex.endDate ? new Date(ex.endDate) : exStart;
            const inRange = exStart <= endDate && exEnd >= startDate;
            
            // City filter
            const cityMatch = currentCityFilter === 'all' || cityName === currentCityFilter;
            
            // Type filter
            const typeMatch = currentTypeFilter === 'all' || ex.type === currentTypeFilter;
            
            if (inRange && cityMatch && typeMatch) {
                totalCount++;
                if (ex.type === 'auction') auctionCount++;
                if (ex.type === 'gallery') galleryCount++;
                if (ex.type === 'fair') fairCount++;
                
                // Add marker
                const coords = cityCoords[cityName];
                if (coords) {
                    const offset = (Math.random() - 0.5) * 0.02;
                    const marker = L.marker([coords[0] + offset, coords[1] + offset]).addTo(map);
                    
                    const icons = { auction: '拍', gallery: '展', fair: '博', opportunity: '投' };
                    const labels = { auction: '拍卖', gallery: '展览', fair: '艺博会', opportunity: '投稿' };
                    
                    marker.bindPopup(`
                        <div style="padding:10px;min-width:200px;">
                            <span style="background:#333;color:white;padding:2px 8px;border-radius:4px;font-size:12px;">${labels[ex.type] || ex.type}</span>
                            <h3 style="margin:10px 0 5px;font-size:16px;">${ex.title}</h3>
                            <p style="margin:5px 0;color:#666;font-size:14px;">${ex.gallery}</p>
                            <p style="margin:5px 0;color:#999;font-size:12px;">${ex.startDate} - ${ex.endDate || 'ongoing'}</p>
                            ${ex.website ? `<a href="${ex.website}" target="_blank" style="color:#dc2626;">访问官网 →</a>` : ''}
                        </div>
                    `);
                    markers.push(marker);
                }
            }
        }
    }

    // Update stats
    document.getElementById('statTotal').textContent = totalCount;
    document.getElementById('statAuction').textContent = auctionCount;
    document.getElementById('statGallery').textContent = galleryCount;
    document.getElementById('statFair').textContent = fairCount;
    
    console.log('Rendered:', totalCount, 'markers');
}
