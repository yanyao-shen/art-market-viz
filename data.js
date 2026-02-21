// Art market reference links by category and city
const referenceLinks = {
    'New York': [
        { name: 'Christie\'s New York', url: 'https://www.christies.com/en/locations/new-york' },
        { name: 'Sotheby\'s New York', url: 'https://www.sothebys.com/en/departments/new-york' },
        { name: 'The Armory Show', url: 'https://thearmoryshow.com' },
        { name: 'Frieze New York', url: 'https://frieze.com/fairs/frieze-new-york' },
        { name: 'Gagosian Gallery', url: 'https://gagosian.com/locations/new-york/' },
        { name: 'David Zwirner', url: 'https://www.davidzwirner.com' }
    ],
    'Beijing': [
        { name: '保利拍卖', url: 'https://www.polyauction.com' },
        { name: '中国嘉德', url: 'https://www.cguardian.com' },
        { name: 'UCCA尤伦斯', url: 'https://ucca.org.cn' },
        { name: '北京当代艺博会', url: 'https://www.beijingcontemporary.com' },
        { name: '长征空间', url: 'http://www.longmarchspace.com' }
    ],
    'Shanghai': [
        { name: '西岸艺术与设计博览会', url: 'https://www.westbund.com.cn' },
        { name: 'ART021', url: 'https://www.art021.com' },
        { name: '上海当代艺术博物馆', url: 'https://www.powerstationofart.com' },
        { name: '西泠印社拍卖', url: 'https://www.xlym.cn' }
    ],
    'Hong Kong': [
        { name: '佳士得香港', url: 'https://www.christies.com/en/locations/hong-kong' },
        { name: '苏富比香港', url: 'https://www.sothebys.com/en/departments/hong-kong' },
        { name: 'Art Basel Hong Kong', url: 'https://artbasel.com/hong-kong' },
        { name: 'Art Central', url: 'https://artcentralhongkong.com' },
        { name: '藝術門画廊', url: 'https://www.pearllam.com' }
    ],
    'global': [
        { name: 'Artnet', url: 'https://www.artnet.com' },
        { name: 'Artsy', url: 'https://www.artsy.net' },
        { name: 'Artprice', url: 'https://www.artprice.com' },
        { name: 'The Art Newspaper', url: 'https://www.theartnewspaper.com' }
    ]
};

// Mock data for art market events
// In production, this would be fetched from APIs or scraped data

const artEvents = [
    // AUCTIONS - New York
    {
        id: 1,
        type: 'auction',
        title: 'Impressionist & Modern Art Evening Sale',
        titleCn: '印象派与现代艺术晚拍',
        venue: 'Christie\'s New York',
        venueCn: '佳士得纽约',
        location: [40.7614, -73.9776],
        city: 'New York',
        date: '2026-03-05',
        price: '$180M - $250M',
        description: 'Featuring works by Monet, Picasso, and Van Gogh',
        image: null
    },
    {
        id: 2,
        type: 'auction',
        title: 'Contemporary Art Evening Auction',
        titleCn: '当代艺术晚拍',
        venue: 'Sotheby\'s New York',
        venueCn: '苏富比纽约',
        location: [40.7612, -73.9770],
        city: 'New York',
        date: '2026-03-12',
        price: '$120M - $180M',
        description: 'Basquiat, Koons, and Richter highlights',
        image: null
    },
    {
        id: 3,
        type: 'auction',
        title: 'Chinese Paintings Spring Sale',
        titleCn: '中国书画春拍',
        venue: 'Christie\'s New York',
        venueCn: '佳士得纽约',
        location: [40.7614, -73.9776],
        city: 'New York',
        date: '2026-02-28',
        price: '$45M - $60M',
        description: 'Zhang Daqian, Qi Baishi masterpieces',
        image: null
    },
    {
        id: 4,
        type: 'auction',
        title: '20th Century Art Day Sale',
        titleCn: '二十世纪艺术日拍',
        venue: 'Phillips New York',
        venueCn: '富艺斯纽约',
        location: [40.7489, -73.9680],
        city: 'New York',
        date: '2026-03-18',
        price: '$25M - $35M',
        description: 'Emerging artists and mid-century works',
        image: null
    },
    {
        id: 5,
        type: 'auction',
        title: 'Latin American Art',
        titleCn: '拉丁美洲艺术',
        venue: 'Christie\'s New York',
        venueCn: '佳士得纽约',
        location: [40.7614, -73.9776],
        city: 'New York',
        date: '2026-02-15',
        price: '$35M - $50M',
        description: 'Kahlo, Rivera, and Tamayo',
        image: null
    },

    // AUCTIONS - Shanghai/Beijing/Hong Kong
    {
        id: 6,
        type: 'auction',
        title: 'Spring Auctions Hong Kong',
        titleCn: '香港春季拍卖',
        venue: 'Christie\'s Hong Kong',
        venueCn: '佳士得香港',
        location: [22.2833, 114.1588],
        city: 'Hong Kong',
        date: '2026-03-25',
        price: '$400M - $550M',
        description: 'Asian 20th Century & Contemporary Art',
        image: null
    },
    {
        id: 7,
        type: 'auction',
        title: 'Modern and Contemporary Art',
        titleCn: '现代及当代艺术',
        venue: 'Sotheby\'s Hong Kong',
        venueCn: '苏富比香港',
        location: [22.2818, 114.1581],
        city: 'Hong Kong',
        date: '2026-04-02',
        price: '$280M - $380M',
        description: 'Zao Wou-Ki, Yayoi Kusama, Yoshitomo Nara',
        image: null
    },
    {
        id: 8,
        type: 'auction',
        title: 'Beijing Spring Auction',
        titleCn: '北京春季拍卖会',
        venue: 'Poly Auction Beijing',
        venueCn: '保利拍卖北京',
        location: [39.9042, 116.4074],
        city: 'Beijing',
        date: '2026-03-20',
        price: '¥800M - ¥1.2B',
        description: 'Classical Chinese paintings and porcelain',
        image: null
    },
    {
        id: 9,
        type: 'auction',
        title: 'Guardian Spring Auctions',
        titleCn: '嘉德春拍',
        venue: 'China Guardian Beijing',
        venueCn: '中国嘉德北京',
        location: [39.9042, 116.4074],
        city: 'Beijing',
        date: '2026-03-28',
        price: '¥600M - ¥900M',
        description: 'Contemporary Chinese art and antiques',
        image: null
    },
    {
        id: 10,
        type: 'auction',
        title: 'Shanghai Spring Art Auction',
        titleCn: '上海春季艺术品拍卖',
        venue: 'Xiling Yinshe Shanghai',
        venueCn: '西泠印社拍卖',
        location: [31.2304, 121.4737],
        city: 'Shanghai',
        date: '2026-04-08',
        price: '¥200M - ¥350M',
        description: 'Seal carving, calligraphy, and paintings',
        image: null
    },
    {
        id: 11,
        type: 'auction',
        title: 'Hong Kong Chinese Paintings',
        titleCn: '香港中国书画',
        venue: 'Bonhams Hong Kong',
        venueCn: '邦瀚斯香港',
        location: [22.2815, 114.1575],
        city: 'Hong Kong',
        date: '2026-02-20',
        price: '$15M - $25M',
        description: 'Fine classical and modern Chinese paintings',
        image: null
    },

    // GALLERIES - New York
    {
        id: 12,
        type: 'gallery',
        title: 'Eternal Forms: Sculpture Exhibition',
        titleCn: '永恒之形：雕塑展',
        venue: 'Gagosian Gallery',
        venueCn: '高古轩画廊',
        location: [40.7625, -73.9730],
        city: 'New York',
        date: '2026-02-15',
        endDate: '2026-04-15',
        price: 'Free',
        description: 'Contemporary sculpture from Richard Serra and Anish Kapoor',
        image: null
    },
    {
        id: 13,
        type: 'gallery',
        title: 'Color Fields: Abstract Expressionism',
        titleCn: '色域：抽象表现主义',
        venue: 'David Zwirner',
        venueCn: '卓纳画廊',
        location: [40.7493, -74.0048],
        city: 'New York',
        date: '2026-03-01',
        endDate: '2026-04-30',
        price: 'Free',
        description: 'Rothko, Newman, and contemporary color field painters',
        image: null
    },
    {
        id: 14,
        type: 'gallery',
        title: 'East Meets West: Contemporary Dialogues',
        titleCn: '东西相遇：当代对话',
        venue: 'Pace Gallery',
        venueCn: '佩斯画廊',
        location: [40.7749, -73.9636],
        city: 'New York',
        date: '2026-02-20',
        endDate: '2026-05-01',
        price: 'Free',
        description: 'Cross-cultural contemporary art exhibition',
        image: null
    },
    {
        id: 15,
        type: 'gallery',
        title: 'Ink and Inspiration',
        titleCn: '水墨与灵感',
        venue: 'FQM',
        venueCn: 'FQM画廊',
        location: [40.7484, -73.9857],
        city: 'New York',
        date: '2026-03-10',
        endDate: '2026-05-15',
        price: 'Free',
        description: 'Contemporary Chinese ink painting',
        image: null
    },
    {
        id: 16,
        type: 'gallery',
        title: 'Digital Horizons',
        titleCn: '数字地平线',
        venue: ' bitforms gallery',
        venueCn: 'bitforms画廊',
        location: [40.7220, -73.9971],
        city: 'New York',
        date: '2026-02-25',
        endDate: '2026-04-20',
        price: 'Free',
        description: 'NFT and digital art showcase',
        image: null
    },
    {
        id: 17,
        type: 'gallery',
        title: 'Photography Now',
        titleCn: '当下摄影',
        venue: 'Fraenkel Gallery',
        venueCn: 'Fraenkel画廊',
        location: [40.7490, -74.0040],
        city: 'New York',
        date: '2026-03-15',
        endDate: '2026-05-30',
        price: 'Free',
        description: 'Contemporary photography from emerging artists',
        image: null
    },

    // GALLERIES - China
    {
        id: 18,
        type: 'gallery',
        title: 'Metamorphosis: Chinese Contemporary Art',
        titleCn: '蜕变：中国当代艺术',
        venue: 'China Institute Gallery',
        venueCn: '华美协进社画廊',
        location: [40.7643, -73.9675],
        city: 'New York',
        date: '2026-02-10',
        endDate: '2026-05-20',
        price: '$10',
        description: 'Exploring transformation in Chinese contemporary art',
        image: null
    },
    {
        id: 19,
        type: 'gallery',
        title: 'Xu Bing: Language and Art',
        titleCn: '徐冰：语言与艺术',
        venue: 'UCCA Center for Contemporary Art',
        venueCn: 'UCCA尤伦斯当代艺术中心',
        location: [39.9042, 116.4074],
        city: 'Beijing',
        date: '2026-02-01',
        endDate: '2026-05-30',
        price: '¥100',
        description: 'Retrospective of Xu Bing\'s language-based artworks',
        image: null
    },
    {
        id: 20,
        type: 'gallery',
        title: 'Cai Guo-Qiang: Gunpowder Art',
        titleCn: '蔡国强：火药艺术',
        venue: 'Power Station of Art',
        venueCn: '上海当代艺术博物馆',
        location: [31.2304, 121.4737],
        city: 'Shanghai',
        date: '2026-03-05',
        endDate: '2026-06-30',
        price: '¥80',
        description: 'Explosive works and gunpowder drawings',
        image: null
    },
    {
        id: 21,
        type: 'gallery',
        title: 'Zhang Xiaogang: Bloodline',
        titleCn: '张晓刚：血缘',
        venue: 'Pace Beijing',
        venueCn: '佩斯北京',
        location: [39.9042, 116.4074],
        city: 'Beijing',
        date: '2026-02-20',
        endDate: '2026-04-30',
        price: 'Free',
        description: 'New works from the Bloodline series',
        image: null
    },
    {
        id: 22,
        type: 'gallery',
        title: 'Ink Evolution',
        titleCn: '水墨进化',
        venue: 'Pearl Lam Galleries',
        venueCn: '藝術門画廊',
        location: [22.2818, 114.1581],
        city: 'Hong Kong',
        date: '2026-03-01',
        endDate: '2026-05-15',
        price: 'Free',
        description: 'Contemporary interpretations of ink painting',
        image: null
    },
    {
        id: 23,
        type: 'gallery',
        title: 'Liu Wei: Invisible Cities',
        titleCn: '刘韡：看不见的城市',
        venue: 'Long March Space',
        venueCn: '长征空间',
        location: [39.9042, 116.4074],
        city: 'Beijing',
        date: '2026-03-20',
        endDate: '2026-06-15',
        price: 'Free',
        description: 'Large-scale installation and sculpture',
        image: null
    },

    // ART FAIRS
    {
        id: 24,
        type: 'fair',
        title: 'The Armory Show',
        titleCn: '军械库艺博会',
        venue: 'Javits Center',
        venueCn: '贾维茨中心',
        location: [40.7577, -74.0026],
        city: 'New York',
        date: '2026-03-06',
        endDate: '2026-03-08',
        price: '$55 - $125',
        description: 'Leading international contemporary art fair',
        image: null
    },
    {
        id: 25,
        type: 'fair',
        title: 'Art Basel Hong Kong',
        titleCn: '香港巴塞尔艺术展',
        venue: 'Hong Kong Convention Centre',
        venueCn: '香港会议展览中心',
        location: [22.2833, 114.1739],
        city: 'Hong Kong',
        date: '2026-03-26',
        endDate: '2026-03-28',
        price: '$380 - $3,500',
        description: 'Asia\'s premier international art fair',
        image: null
    },
    {
        id: 26,
        type: 'fair',
        title: 'Frieze New York',
        titleCn: '纽约弗里兹艺博会',
        venue: 'The Shed',
        venueCn: 'The Shed艺术中心',
        location: [40.7536, -74.0023],
        city: 'New York',
        date: '2026-05-06',
        endDate: '2026-05-09',
        price: '$65 - $165',
        description: 'Contemporary art fair in Hudson Yards',
        image: null
    },
    {
        id: 27,
        type: 'fair',
        title: 'West Bund Art & Design',
        titleCn: '西岸艺术与设计博览会',
        venue: 'West Bund Art Center',
        venueCn: '西岸艺术中心',
        location: [31.2304, 121.4737],
        city: 'Shanghai',
        date: '2026-04-10',
        endDate: '2026-04-13',
        price: '¥150 - ¥500',
        description: 'Shanghai\'s leading contemporary art fair',
        image: null
    },
    {
        id: 28,
        type: 'fair',
        title: 'Art021 Shanghai',
        titleCn: 'ART021上海廿一当代艺术博览会',
        venue: 'Shanghai Exhibition Center',
        venueCn: '上海展览中心',
        location: [31.2304, 121.4737],
        city: 'Shanghai',
        date: '2026-04-16',
        endDate: '2026-04-19',
        price: '¥100 - ¥300',
        description: 'Shanghai contemporary art fair',
        image: null
    },
    {
        id: 29,
        type: 'fair',
        title: 'Asia Week New York',
        titleCn: '纽约亚洲艺术周',
        venue: 'Multiple Venues',
        venueCn: '多个场馆',
        location: [40.7614, -73.9776],
        city: 'New York',
        date: '2026-03-12',
        endDate: '2026-03-20',
        price: 'Free - $25',
        description: 'Celebrating Asian art across NYC galleries',
        image: null
    },
    {
        id: 30,
        type: 'fair',
        title: 'Art Central Hong Kong',
        titleCn: 'Art Central香港',
        venue: 'Central Harbourfront',
        venueCn: '中环海滨',
        location: [22.2833, 114.1588],
        city: 'Hong Kong',
        date: '2026-03-24',
        endDate: '2026-03-28',
        price: '$200 - $350',
        description: 'Contemporary art fair alongside Art Basel',
        image: null
    },
    {
        id: 31,
        type: 'fair',
        title: 'Beijing Contemporary',
        titleCn: '北京当代',
        venue: 'National Agricultural Exhibition Center',
        venueCn: '全国农业展览馆',
        location: [39.9042, 116.4074],
        city: 'Beijing',
        date: '2026-04-25',
        endDate: '2026-04-28',
        price: '¥80 - ¥200',
        description: 'Beijing\'s international art fair',
        image: null
    },
    {
        id: 32,
        type: 'fair',
        title: 'TEFAF New York Spring',
        titleCn: 'TEFAF纽约春季展',
        venue: 'Park Avenue Armory',
        venueCn: '公园大道军械库',
        location: [40.7673, -73.9678],
        city: 'New York',
        date: '2026-05-01',
        endDate: '2026-05-05',
        price: '$55 - $75',
        description: 'Fine art and antiques from world\'s top dealers',
        image: null
    }
];

// Helper function to get events by date range
function getEventsByDateRange(startDate, endDate, type = 'all') {
    return artEvents.filter(event => {
        const eventDate = new Date(event.date);
        const inRange = eventDate >= startDate && eventDate <= endDate;
        const typeMatch = type === 'all' || event.type === type;
        return inRange && typeMatch;
    });
}

// Helper function to get events by city
function getEventsByCity(city) {
    return artEvents.filter(event => event.city === city);
}

// Helper function to format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric'
    });
}

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { artEvents, referenceLinks, getEventsByDateRange, getEventsByCity, formatDate };
}
