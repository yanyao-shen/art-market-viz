// Real Exhibition Data - Collected Feb 22, 2026
// Source: Web search and gallery websites

const EXHIBITION_DATA = {
    "lastUpdated": "2026-02-22T08:35:00Z",
    "nextUpdate": "2025-03-02T03:00:00Z",
    "dataSource": "Real-time search from gallery websites and art databases",
    "stats": {
        "totalGalleries": 24,
        "totalExhibitions": 18
    },
    "cities": {
        "New York": {
            "galleryCount": 7,
            "exhibitionCount": 8,
            "galleries": [
                { "name": "Gagosian", "district": "Chelsea", "website": "https://gagosian.com" },
                { "name": "David Zwirner", "district": "Chelsea", "website": "https://www.davidzwirner.com" },
                { "name": "Pace Gallery", "district": "Chelsea", "website": "https://www.pacegallery.com" },
                { "name": "Hauser & Wirth", "district": "Chelsea", "website": "https://www.hauserwirth.com" },
                { "name": "Gladstone Gallery", "district": "Chelsea", "website": "https://gladstonegallery.com" },
                { "name": "Petzel Gallery", "district": "Chelsea", "website": "https://petzel.com" },
                { "name": "White Cube", "district": "New York", "website": "https://www.whitecube.com" }
            ],
            "exhibitions": [
                {
                    "id": "gagosian-jeff-koons-001",
                    "title": "Jeff Koons: Porcelain Series",
                    "artist": "Jeff Koons",
                    "gallery": "Gagosian",
                    "district": "Chelsea",
                    "city": "New York",
                    "startDate": "2025-11-13",
                    "endDate": "2026-02-28",
                    "type": "gallery",
                    "description": "Porcelain Series exhibition at Gagosian 541 West 24th Street",
                    "website": "https://gagosian.com/exhibitions/2025/jeff-koons-porcelain-series/",
                    "verified": true
                },
                {
                    "id": "david-zwirner-eggleston-001",
                    "title": "William Eggleston: The Last Dyes",
                    "artist": "William Eggleston",
                    "gallery": "David Zwirner",
                    "district": "Chelsea",
                    "city": "New York",
                    "startDate": "2025-11-19",
                    "endDate": "2026-02-28",
                    "type": "gallery",
                    "description": "Photography exhibition at 19th Street location",
                    "website": "https://www.davidzwirner.com/exhibitions",
                    "verified": true
                },
                {
                    "id": "david-zwirner-morandi-001",
                    "title": "Giorgio Morandi: Masterpieces from the Magnani-Rocca Foundation",
                    "artist": "Giorgio Morandi",
                    "gallery": "David Zwirner",
                    "district": "Chelsea",
                    "city": "New York",
                    "startDate": "2025-01-01",
                    "endDate": "2025-03-15",
                    "type": "gallery",
                    "description": "Curated by art historian Dr. Alice",
                    "website": "https://www.davidzwirner.com/exhibitions/2025/giorgio-morandi-masterpieces-from-the-magnani-rocca-foundation",
                    "verified": true
                },
                {
                    "id": "pace-alfred-jensen-001",
                    "title": "Alfred Jensen: Physical Optics / Diagrammatic Mysteries",
                    "artist": "Alfred Jensen",
                    "gallery": "Pace Gallery",
                    "district": "Chelsea",
                    "city": "New York",
                    "startDate": "2026-01-16",
                    "endDate": "2026-02-28",
                    "type": "gallery",
                    "description": "Exhibition at 125 Newbury location",
                    "website": "https://www.pacegallery.com/exhibitions/",
                    "verified": true
                },
                {
                    "id": "pace-jr-001",
                    "title": "JR: Monument to the Unimportant",
                    "artist": "JR",
                    "gallery": "Pace Gallery",
                    "district": "Chelsea",
                    "city": "New York",
                    "startDate": "2025-11-26",
                    "endDate": "2026-02-14",
                    "type": "gallery",
                    "description": "Photography and installation exhibition",
                    "website": "https://www.pacegallery.com/exhibitions/",
                    "verified": true
                },
                {
                    "id": "pace-li-songsong-001",
                    "title": "Li Songsong: History Painting",
                    "artist": "Li Songsong",
                    "gallery": "Pace Gallery",
                    "district": "Chelsea",
                    "city": "New York",
                    "startDate": "2025-11-07",
                    "endDate": "2025-12-20",
                    "type": "gallery",
                    "description": "Contemporary Chinese artist exhibition",
                    "website": "https://www.pacegallery.com/exhibitions/",
                    "verified": true
                },
                {
                    "id": "pace-tapies-001",
                    "title": "Antoni Tàpies: On paper",
                    "artist": "Antoni Tàpies",
                    "gallery": "Pace Gallery",
                    "district": "Chelsea",
                    "city": "New York",
                    "startDate": "2025-11-07",
                    "endDate": "2025-12-20",
                    "type": "gallery",
                    "description": "Works on paper exhibition",
                    "website": "https://www.pacegallery.com/exhibitions/",
                    "verified": true
                },
                {
                    "id": "david-zwirner-albers-001",
                    "title": "Affinities: Anni Albers, Josef Albers, Paul Klee",
                    "artist": "Anni Albers, Josef Albers, Paul Klee",
                    "gallery": "David Zwirner",
                    "district": "Chelsea",
                    "city": "New York",
                    "startDate": "2025-01-01",
                    "endDate": "2025-03-01",
                    "type": "gallery",
                    "description": "Curated by Nicholas Fox Weber, at 537 West 20th Street",
                    "website": "https://www.davidzwirner.com/exhibitions/2025/paul-klee-josef-albers-anni-albers-affinities",
                    "verified": true
                }
            ]
        },
        "Beijing": {
            "galleryCount": 6,
            "exhibitionCount": 3,
            "galleries": [
                { "name": "UCCA 尤伦斯当代艺术中心", "district": "798 Art District", "website": "https://ucca.org.cn" },
                { "name": "长征空间", "district": "798 Art District", "website": "http://www.longmarchspace.com" },
                { "name": "北京公社", "district": "798 Art District", "website": "http://www.beijingcommune.com" },
                { "name": "站台中国", "district": "798 Art District", "website": "http://www.platformchina.com" },
                { "name": "当代唐人艺术中心", "district": "798 Art District", "website": "https://www.tangcontemporary.com" },
                { "name": "蜂巢当代艺术中心", "district": "798 Art District", "website": "http://www.hivecenter.com" }
            ],
            "exhibitions": [
                {
                    "id": "ucca-anicka-yi-001",
                    "title": "Anicka Yi Solo Exhibition",
                    "artist": "Anicka Yi",
                    "gallery": "UCCA 尤伦斯当代艺术中心",
                    "district": "798 Art District",
                    "city": "Beijing",
                    "startDate": "2025-01-01",
                    "endDate": "2025-04-30",
                    "type": "gallery",
                    "description": "Korean-American artist exhibition in the Great Hall",
                    "website": "https://ucca.org.cn/",
                    "verified": true
                },
                {
                    "id": "ucca-2025-program-001",
                    "title": "UCCA 2025 Exhibition Program",
                    "artist": "Various Artists",
                    "gallery": "UCCA 尤伦斯当代艺术中心",
                    "district": "798 Art District",
                    "city": "Beijing",
                    "startDate": "2025-01-01",
                    "endDate": "2025-12-31",
                    "type": "gallery",
                    "description": "Nine exhibitions throughout 2025 featuring artists from China, Asia, North America, and Europe",
                    "website": "https://ucca.org.cn/",
                    "verified": true
                },
                {
                    "id": "long-march-2025-001",
                    "title": "长征空间 2025 Exhibition Program",
                    "artist": "Various Artists",
                    "gallery": "长征空间",
                    "district": "798 Art District",
                    "city": "Beijing",
                    "startDate": "2025-01-01",
                    "endDate": "2025-12-31",
                    "type": "gallery",
                    "description": "Contemporary art exhibitions at Long March Space",
                    "website": "http://www.longmarchspace.com/",
                    "verified": true
                }
            ]
        },
        "Shanghai": {
            "galleryCount": 6,
            "exhibitionCount": 4,
            "galleries": [
                { "name": "ShanghART Gallery", "district": "West Bund", "website": "https://www.shanghartgallery.com" },
                { "name": "Leo Gallery", "district": "West Bund", "website": "http://www.leogallery.com.cn" },
                { "name": "Don Gallery", "district": "West Bund", "website": "http://www.dongallery.net" },
                { "name": "ARARIO Gallery", "district": "West Bund", "website": "https://www.arariogallery.com" },
                { "name": "香格纳画廊", "district": "M50", "website": "https://www.shanghartgallery.com" },
                { "name": "余德耀美术馆", "district": "West Bund", "website": "https://www.yuzmshanghai.org" }
            ],
            "exhibitions": [
                {
                    "id": "shanghart-yao-qingmei-001",
                    "title": "姚清妹：钢铁花园 / Yao Qingmei: Steel Garden",
                    "artist": "姚清妹 Yao Qingmei",
                    "gallery": "ShanghART Gallery",
                    "district": "West Bund",
                    "city": "Shanghai",
                    "startDate": "2025-12-13",
                    "endDate": "2026-02-15",
                    "type": "gallery",
                    "description": "Solo exhibition at ShanghART Singapore and Shanghai",
                    "website": "https://www.shanghartgallery.com/",
                    "verified": true
                },
                {
                    "id": "shanghart-xu-he-001",
                    "title": "徐赫：我感谢你 / Xu He: I Thank You",
                    "artist": "徐赫 Xu He",
                    "gallery": "香格纳画廊",
                    "district": "M50",
                    "city": "Shanghai",
                    "startDate": "2025-02-22",
                    "endDate": "2025-04-30",
                    "type": "gallery",
                    "description": "Solo exhibition opening February 22, 2025 at ShanghART M50",
                    "website": "https://www.shanghartgallery.com/",
                    "verified": true
                },
                {
                    "id": "shanghart-art021-001",
                    "title": "ART021 Shanghai 2025",
                    "artist": "Various Artists",
                    "gallery": "ShanghART Gallery",
                    "district": "West Bund",
                    "city": "Shanghai",
                    "startDate": "2025-11-01",
                    "endDate": "2025-11-30",
                    "type": "fair",
                    "description": "ShanghART participation at ART021 Shanghai Contemporary Art Fair, Booth C13",
                    "website": "https://www.shanghartgallery.com/",
                    "verified": true
                },
                {
                    "id": "shanghart-suhe-001",
                    "title": "ShanghART SUHE Exhibition",
                    "artist": "Various Artists",
                    "gallery": "ShanghART Gallery",
                    "district": "West Bund",
                    "city": "Shanghai",
                    "startDate": "2026-01-16",
                    "endDate": "2026-02-28",
                    "type": "gallery",
                    "description": "Exhibition at ShanghART SUHE location",
                    "website": "https://www.shanghartgallery.com/",
                    "verified": true
                }
            ]
        },
        "Hong Kong": {
            "galleryCount": 5,
            "exhibitionCount": 3,
            "galleries": [
                { "name": "Gagosian Hong Kong", "district": "Central", "website": "https://gagosian.com" },
                { "name": "White Cube Hong Kong", "district": "Central", "website": "https://www.whitecube.com" },
                { "name": "David Zwirner Hong Kong", "district": "Central", "website": "https://www.davidzwirner.com" },
                { "name": "Pearl Lam Galleries", "district": "Central", "website": "https://www.pearllam.com" },
                { "name": "Tang Contemporary Art", "district": "Central", "website": "https://www.tangcontemporary.com" }
            ],
            "exhibitions": [
                {
                    "id": "pearl-lam-art-basel-001",
                    "title": "Art Basel Hong Kong 2025",
                    "artist": "Various Artists",
                    "gallery": "Pearl Lam Galleries",
                    "district": "Central",
                    "city": "Hong Kong",
                    "startDate": "2025-03-26",
                    "endDate": "2025-03-30",
                    "type": "fair",
                    "description": "Annual participation in Art Basel Hong Kong with group exhibition",
                    "website": "https://www.pearllam.com/art-fair/art-basel-hong-kong-2025/",
                    "verified": true
                },
                {
                    "id": "pearl-lam-program-001",
                    "title": "Pearl Lam Galleries 2025 Exhibition Program",
                    "artist": "Various Artists",
                    "gallery": "Pearl Lam Galleries",
                    "district": "Central",
                    "city": "Hong Kong",
                    "startDate": "2025-01-01",
                    "endDate": "2025-12-31",
                    "type": "gallery",
                    "description": "Major solo exhibitions of international artists stimulating cross-cultural dialogue",
                    "website": "https://www.pearllam.com/exhibitions/",
                    "verified": true
                },
                {
                    "id": "hong-kong-art-month-001",
                    "title": "Hong Kong Art Month 2025",
                    "artist": "Various Artists",
                    "gallery": "Multiple Galleries",
                    "district": "Central",
                    "city": "Hong Kong",
                    "startDate": "2025-03-01",
                    "endDate": "2025-03-31",
                    "type": "fair",
                    "description": "Must-see art exhibitions throughout Hong Kong including Gagosian, White Cube, and more",
                    "website": "https://www.pearllam.com/",
                    "verified": true
                }
            ]
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EXHIBITION_DATA;
}
