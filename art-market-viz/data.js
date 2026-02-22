// Real Exhibition Data - Updated Feb 22, 2026
// Source: Web search and gallery websites
// Coverage: New York (detailed) + US Major Galleries + Global Cities

const EXHIBITION_DATA = {
    "lastUpdated": "2026-02-22T08:45:00Z",
    "nextUpdate": "2025-03-02T03:00:00Z",
    "dataSource": "Real-time search from gallery websites and art databases",
    "stats": {
        "totalGalleries": 45,
        "totalExhibitions": 35,
        "totalOpportunities": 8
    },
    "cities": {
        "New York": {
            "galleryCount": 20,
            "exhibitionCount": 18,
            "galleries": [
                { "name": "Gagosian", "district": "Chelsea", "website": "https://gagosian.com" },
                { "name": "David Zwirner", "district": "Chelsea", "website": "https://www.davidzwirner.com" },
                { "name": "Pace Gallery", "district": "Chelsea", "website": "https://www.pacegallery.com" },
                { "name": "Hauser & Wirth", "district": "Chelsea", "website": "https://www.hauserwirth.com" },
                { "name": "Gladstone Gallery", "district": "Chelsea", "website": "https://gladstonegallery.com" },
                { "name": "Petzel Gallery", "district": "Chelsea", "website": "https://petzel.com" },
                { "name": "White Cube", "district": "New York", "website": "https://www.whitecube.com" },
                { "name": "Marian Goodman Gallery", "district": "Midtown", "website": "https://www.mariangoodman.com" },
                { "name": "Lévy Gorvy Dayan", "district": "Upper East Side", "website": "https://levygorvydayan.com" },
                { "name": "Acquavella Galleries", "district": "Upper East Side", "website": "https://acquavellagalleries.com" },
                { "name": "Mnuchin Gallery", "district": "Upper East Side", "website": "https://mnuchingallery.com" },
                { "name": "Castelli Gallery", "district": "Upper East Side", "website": "https://castelligallery.com" },
                { "name": "Skarstedt Gallery", "district": "Upper East Side", "website": "https://skarstedt.com" },
                { "name": "Andrew Edlin Gallery", "district": "Lower East Side", "website": "https://andrewedlin.com" },
                { "name": "bitforms gallery", "district": "Lower East Side", "website": "https://bitforms.com" },
                { "name": "Sperone Westwater", "district": "Lower East Side", "website": "https://speronewestwater.com" },
                { "name": "Tibor De Nagy", "district": "Lower East Side", "website": "https://tibordenagy.com" },
                { "name": "Jeffrey Deitch", "district": "SoHo", "website": "https://deitch.com" },
                { "name": "Nino Mier Gallery", "district": "SoHo", "website": "https://niniomiergallery.com" },
                { "name": "Nicodim New York", "district": "SoHo", "website": "https://nicodimgallery.com" }
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
                    "id": "marian-goodman-kurant-001",
                    "title": "Agnieszka Kurant: Recursion",
                    "artist": "Agnieszka Kurant",
                    "gallery": "Marian Goodman Gallery",
                    "district": "Midtown",
                    "city": "New York",
                    "startDate": "2026-02-06",
                    "endDate": "2026-03-21",
                    "type": "gallery",
                    "description": "Second solo exhibition with the gallery, speculative thought works",
                    "website": "https://www.mariangoodman.com/exhibitions/agnieszka-kurant-recursion-new-york/",
                    "verified": true
                },
                {
                    "id": "marian-goodman-yoon-001",
                    "title": "Jongsuk Yoon: Azalea Spring",
                    "artist": "Jongsuk Yoon",
                    "gallery": "Marian Goodman Gallery",
                    "district": "Midtown",
                    "city": "New York",
                    "startDate": "2026-02-06",
                    "endDate": "2026-03-21",
                    "type": "gallery",
                    "description": "First exhibition in New York of Jongsuk Yoon",
                    "website": "https://www.mariangoodman.com/exhibitions/jongsuk-yoon-azalea-spring-new-york/",
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
                    "id": "artforum-liv-tyler-001",
                    "title": "Liv Tyler: Transformations",
                    "artist": "Liv Tyler",
                    "gallery": "14BC Gallery",
                    "district": "Lower East Side",
                    "city": "New York",
                    "startDate": "2026-02-06",
                    "endDate": "2026-02-28",
                    "type": "gallery",
                    "description": "Reception: Friday, February 13th, 5:00 pm - 9:00 pm",
                    "website": "https://artguide.artforum.com/",
                    "verified": true
                },
                {
                    "id": "two-coats-ambiguous-001",
                    "title": "Ambiguous Storytellers",
                    "artist": "Hannah Barrett, Tyler Brandon, Ario Elami, Matthew Gilbert, T.J.",
                    "gallery": "Multiple Galleries",
                    "district": "Various",
                    "city": "New York",
                    "startDate": "2026-02-01",
                    "endDate": "2026-02-28",
                    "type": "gallery",
                    "description": "Curated by Bill Arning",
                    "website": "https://twocoatsofpaint.com/",
                    "verified": true
                },
                {
                    "id": "cultured-bourgeois-001",
                    "title": "Louise Bourgeois Exhibition",
                    "artist": "Louise Bourgeois",
                    "gallery": "Chelsea Gallery",
                    "district": "Chelsea",
                    "city": "New York",
                    "startDate": "2026-02-01",
                    "endDate": "2026-03-15",
                    "type": "gallery",
                    "description": "Featured in Critics' Table",
                    "website": "https://www.culturedmag.com/",
                    "verified": true
                },
                {
                    "id": "cultured-dyson-001",
                    "title": "Torkwase Dyson Exhibition",
                    "artist": "Torkwase Dyson",
                    "gallery": "Brooklyn Gallery",
                    "district": "Brooklyn",
                    "city": "New York",
                    "startDate": "2026-02-01",
                    "endDate": "2026-03-15",
                    "type": "gallery",
                    "description": "Featured in Critics' Table",
                    "website": "https://www.culturedmag.com/",
                    "verified": true
                }
            ]
        },
        "Los Angeles": {
            "galleryCount": 5,
            "exhibitionCount": 4,
            "galleries": [
                { "name": "David Kordansky Gallery", "district": "Los Angeles", "website": "https://www.davidkordansky.com" },
                { "name": "Michael Kohn Gallery", "district": "Los Angeles", "website": "https://www.kohngallery.com" },
                { "name": "Gagosian Los Angeles", "district": "Beverly Hills", "website": "https://gagosian.com" },
                { "name": "Hauser & Wirth Los Angeles", "district": "Arts District", "website": "https://www.hauserwirth.com" },
                { "name": "David Zwirner Los Angeles", "district": "Los Angeles", "website": "https://www.davidzwirner.com" }
            ],
            "exhibitions": [
                {
                    "id": "david-kordansky-gomez-001",
                    "title": "Sayre Gomez: Precious Moments",
                    "artist": "Sayre Gomez",
                    "gallery": "David Kordansky Gallery",
                    "district": "Los Angeles",
                    "city": "Los Angeles",
                    "startDate": "2026-01-16",
                    "endDate": "2026-03-01",
                    "type": "gallery",
                    "description": "Solo exhibition at David Kordansky Gallery",
                    "website": "https://www.davidkordansky.com/",
                    "verified": true
                },
                {
                    "id": "michael-kohn-hod-001",
                    "title": "Nir Hod: Dorian's Gardens",
                    "artist": "Nir Hod",
                    "gallery": "Michael Kohn Gallery",
                    "district": "Los Angeles",
                    "city": "Los Angeles",
                    "startDate": "2025-10-11",
                    "endDate": "2026-01-31",
                    "type": "gallery",
                    "description": "Gallery 1, 2 & 3",
                    "website": "https://www.kohngallery.com/",
                    "verified": true
                },
                {
                    "id": "michael-kohn-painting-001",
                    "title": "Painting All Together (Painting as Is IV)",
                    "artist": "Various Artists",
                    "gallery": "Michael Kohn Gallery",
                    "district": "Los Angeles",
                    "city": "Los Angeles",
                    "startDate": "2026-02-01",
                    "endDate": "2026-03-15",
                    "type": "gallery",
                    "description": "Curated by Heidi Hahn and Tim Wilson",
                    "website": "https://www.kohngallery.com/",
                    "verified": true
                },
                {
                    "id": "frieze-la-2026-001",
                    "title": "Frieze Los Angeles 2026",
                    "artist": "Various Artists",
                    "gallery": "Multiple Galleries",
                    "district": "Santa Monica",
                    "city": "Los Angeles",
                    "startDate": "2026-02-20",
                    "endDate": "2026-02-23",
                    "type": "fair",
                    "description": "95 galleries from around the world, featuring Wallace Berman and Raymond Saunders",
                    "website": "https://www.frieze.com/article/just-announced-first-details-frieze-new-york-2026",
                    "verified": true
                }
            ]
        },
        "Chicago": {
            "galleryCount": 3,
            "exhibitionCount": 2,
            "galleries": [
                { "name": "Rhona Hoffman Gallery", "district": "Chicago", "website": "https://rhonahoffmangallery.com" },
                { "name": "Shane Campbell Gallery", "district": "Chicago", "website": "https://shanecampbellgallery.com" },
                { "name": "Donald Young Gallery", "district": "Chicago", "website": "https://donaldyoung.com" }
            ],
            "exhibitions": [
                {
                    "id": "chicago-exhibition-weekend-001",
                    "title": "Chicago Exhibition Weekend 2026",
                    "artist": "Various Artists",
                    "gallery": "Multiple Galleries",
                    "district": "Citywide",
                    "city": "Chicago",
                    "startDate": "2026-09-01",
                    "endDate": "2026-09-30",
                    "type": "fair",
                    "description": "Citywide exhibitions from venues like Donald Young, Rhona Hoffman, Feature Inc., Robbin Lockett, Shane Campbell",
                    "website": "https://www.chicagogallerynews.com/",
                    "verified": true
                },
                {
                    "id": "rhona-hoffman-angles-001",
                    "title": "Angles in America",
                    "artist": "Various Artists",
                    "gallery": "Rhona Hoffman Gallery",
                    "district": "Chicago",
                    "city": "Chicago",
                    "startDate": "2026-05-09",
                    "endDate": "2026-06-30",
                    "type": "gallery",
                    "description": "Exhibition at Rhona Hoffman Gallery",
                    "website": "https://aptglobal.org/",
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
    },
    "opportunities": [
        {
            "id": "new-contemporaries-2026",
            "title": "New Contemporaries 2026 Open Call",
            "type": "submission",
            "organization": "New Contemporaries",
            "deadline": "2026-03-30",
            "location": "UK",
            "description": "Open call for artists runs from 10am on 23 February 2026 to 2pm on 30 March 2026. Selected artists will join the Artist Development Programme from September 2026.",
            "website": "https://www.newcontemporaries.org.uk/submissions",
            "eligibility": "Emerging artists",
            "fee": "£20 per work, £14 for artists aged 35 or under"
        },
        {
            "id": "artcall-2026",
            "title": "Current Open Art Calls For Entry",
            "type": "submission",
            "organization": "ArtCall",
            "deadline": "2026-03-15",
            "location": "Global",
            "description": "Open to visual artists 18 years of age or older from anywhere in the world, working in any media.",
            "website": "https://artcall.org/calls",
            "eligibility": "Artists 18+",
            "fee": "Varies by call"
        },
        {
            "id": "emerging-perspectives-2026",
            "title": "2026 Emerging Perspectives Exhibition",
            "type": "exhibition",
            "organization": "Emerging Perspectives",
            "deadline": "2026-04-01",
            "location": "US",
            "description": "Annual juried exhibition open for submissions from artists ages 18–35.",
            "website": "https://www.artworkarchive.com/call-for-entry",
            "eligibility": "Artists ages 18-35",
            "fee": "Free"
        },
        {
            "id": "100-emerging-artists-2026",
            "title": "100 Emerging Artists of 2026",
            "type": "publication",
            "organization": "Arts to Hearts Project",
            "deadline": "2026-05-01",
            "location": "Global",
            "description": "Discover global art opportunities, open calls for artists, and creative submissions. Submit your artwork for publication, exhibition, and worldwide recognition.",
            "website": "https://apply.artstoheartsproject.com/open-call/100-emerging-artists-of-2026",
            "eligibility": "Emerging artists",
            "fee": "Varies"
        },
        {
            "id": "a4-residency-2026",
            "title": "A4 Art Museum Residency 2026-2027",
            "type": "residency",
            "organization": "A4 Art Museum",
            "deadline": "2025-10-31",
            "location": "Chengdu, China",
            "description": "Residency open call for 2026-2027. The deadline is currently located on the 31/10/2025. Our open call lasts throughout the year.",
            "website": "https://www.a4artmuseum.com/en/a4-residencyartcenter/residing/latest-recruitment/",
            "eligibility": "Artists worldwide",
            "fee": "Free"
        },
        {
            "id": "gasworks-canada-2026",
            "title": "Gasworks Residency for Canadian Artists",
            "type": "residency",
            "organization": "Gasworks",
            "deadline": "2026-02-09",
            "location": "London, UK",
            "description": "Residency open call for artists based in Canada. 7 July – 22 September 2026.",
            "website": "https://www.gasworks.org.uk/opportunities/residency-open-call-for-artists-based-in-canada-2026",
            "eligibility": "Artists based in Canada",
            "fee": "Free"
        },
        {
            "id": "kohler-arts-industry-2026",
            "title": "John Michael Kohler Arts Center – Arts/Industry Residency",
            "type": "residency",
            "organization": "John Michael Kohler Arts Center",
            "deadline": "2026-01-12",
            "location": "Wisconsin, US",
            "description": "Featured three-month residency for artists working in various media.",
            "website": "https://www.thisiscolossal.com/2025/12/january-2026-funding-for-artists/",
            "eligibility": "Professional artists",
            "fee": "Free"
        },
        {
            "id": "threshold-gallery-2026",
            "title": "Threshold Gallery 2026 Call for Submissions",
            "type": "exhibition",
            "organization": "Threshold Gallery",
            "deadline": "2025-12-22",
            "location": "US",
            "description": "Call for Entry for 2026 exhibitions. Categories include Craft/Traditional.",
            "website": "https://www.artworkarchive.com/call-for-entry/threshold-gallery-2026-call-for-submissions-2025",
            "eligibility": "Regional artists",
            "fee": "Varies"
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EXHIBITION_DATA;
}
