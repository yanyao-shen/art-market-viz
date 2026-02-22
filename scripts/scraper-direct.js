#!/usr/bin/env node
/**
 * Direct Gallery Website Scraper
 * 直接抓取已知画廊官网的展览信息
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 已知画廊列表（从之前调研中收集）
const KNOWN_GALLERIES = {
    'New York': [
        { name: 'Gagosian', website: 'https://gagosian.com/exhibitions/', district: 'Chelsea' },
        { name: 'David Zwirner', website: 'https://www.davidzwirner.com/exhibitions', district: 'Chelsea' },
        { name: 'Hauser & Wirth', website: 'https://www.hauserwirth.com/hauser-wirth-exhibitions', district: 'Chelsea' },
        { name: 'Pace Gallery', website: 'https://www.pacegallery.com/exhibitions/', district: 'Chelsea' },
        { name: 'Gladstone Gallery', website: 'https://gladstonegallery.com/exhibitions', district: 'Chelsea' },
        { name: 'Petzel Gallery', website: 'https://petzel.com/exhibitions', district: 'Chelsea' },
        { name: 'White Cube', website: 'https://www.whitecube.com/exhibitions', district: 'New York' }
    ],
    'Beijing': [
        { name: 'UCCA 尤伦斯当代艺术中心', website: 'https://ucca.org.cn/exhibition/', district: '798 Art District' },
        { name: '长征空间', website: 'http://www.longmarchspace.com/', district: '798 Art District' },
        { name: '北京公社', website: 'http://www.beijingcommune.com/', district: '798 Art District' },
        { name: '站台中国', website: 'http://www.platformchina.com/', district: '798 Art District' },
        { name: '当代唐人艺术中心', website: 'https://www.tangcontemporary.com/', district: '798 Art District' },
        { name: '蜂巢当代艺术中心', website: 'http://www.hivecenter.com/', district: '798 Art District' }
    ],
    'Shanghai': [
        { name: 'ShanghART Gallery', website: 'https://www.shanghartgallery.com/', district: 'West Bund' },
        { name: 'Leo Gallery', website: 'http://www.leogallery.com.cn/', district: 'West Bund' },
        { name: 'Don Gallery', website: 'http://www.dongallery.net/', district: 'West Bund' },
        { name: 'ARARIO Gallery', website: 'https://www.arariogallery.com/', district: 'West Bund' },
        { name: '香格纳画廊', website: 'https://www.shanghartgallery.com/', district: 'M50' },
        { name: '余德耀美术馆', website: 'https://www.yuzmshanghai.org/', district: 'West Bund' }
    ],
    'Hong Kong': [
        { name: 'Gagosian Hong Kong', website: 'https://gagosian.com/exhibitions/', district: 'Central' },
        { name: 'White Cube Hong Kong', website: 'https://www.whitecube.com/exhibitions', district: 'Central' },
        { name: 'David Zwirner Hong Kong', website: 'https://www.davidzwirner.com/exhibitions', district: 'Central' },
        { name: 'Pearl Lam Galleries', website: 'https://www.pearllam.com/', district: 'Central' },
        { name: 'Tang Contemporary Art', website: 'https://www.tangcontemporary.com/', district: 'Central' }
    ]
};

// 延迟函数
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 简单的 HTTP 请求
function fetch(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https:') ? https : http;
        const req = client.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive'
            },
            timeout: 15000
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                fetch(new URL(res.headers.location, url).toString()).then(resolve).catch(reject);
                return;
            }
            
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data }));
        });
        
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    });
}

// 从 HTML 提取展览信息
function extractExhibitionInfo(html, gallery) {
    const exhibitions = [];
    const lowerHtml = html.toLowerCase();
    
    // 检查是否有展览相关内容
    const hasExhibition = lowerHtml.includes('exhibition') || 
                         lowerHtml.includes('current') || 
                         lowerHtml.includes('on view') ||
                         lowerHtml.includes('展览') ||
                         lowerHtml.includes('个展');
    
    if (!hasExhibition) {
        return exhibitions;
    }
    
    // 尝试多种模式提取展览标题
    const titlePatterns = [
        /<h[12][^>]*>([^<]+(?:exhibition|show)[^<]*)<\/h[12]>/i,
        /<h[12][^>]*>([^<]{10,80})<\/h[12]>/,
        /<div[^>]*class="[^"]*(?:title|heading)[^"]*"[^>]*>([^<]{10,80})<\/div>/i,
        /<span[^>]*class="[^"]*(?:title|exhibition)[^"]*"[^>]*>([^<]{10,80})<\/span>/i
    ];
    
    let title = null;
    for (const pattern of titlePatterns) {
        const match = html.match(pattern);
        if (match) {
            title = match[1].trim();
            // 过滤掉导航类文字
            if (title.length > 10 && 
                !title.toLowerCase().includes('home') &&
                !title.toLowerCase().includes('about') &&
                !title.toLowerCase().includes('contact')) {
                break;
            }
        }
    }
    
    // 尝试提取日期
    const datePatterns = [
        /(\w+\s+\d{1,2},?\s+202[56])\s*[-–]\s*(\w+\s+\d{1,2},?\s+202[56])/i,
        /(\d{1,2}\/\d{1,2}\/202[56])\s*[-–]\s*(\d{1,2}\/\d{1,2}\/202[56])/,
        /(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}[-–]/i,
        /(\d{4}[\.\-]\d{1,2}[\.\-]\d{1,2})\s*[-~]\s*(\d{4}[\.\-]\d{1,2}[\.\-]\d{1,2})/
    ];
    
    let startDate = new Date().toISOString().split('T')[0];
    let endDate = null;
    
    for (const pattern of datePatterns) {
        const match = html.match(pattern);
        if (match) {
            try {
                const d1 = new Date(match[1]);
                const d2 = match[2] ? new Date(match[2]) : null;
                if (!isNaN(d1)) startDate = d1.toISOString().split('T')[0];
                if (d2 && !isNaN(d2)) endDate = d2.toISOString().split('T')[0];
                break;
            } catch (e) {}
        }
    }
    
    // 提取艺术家名
    let artist = 'Various Artists';
    const artistPatterns = [
        /<h[23][^>]*>([^<]{3,50})<\/h[23]>/,
        /<div[^>]*class="[^"]*artist[^"]*"[^>]*>([^<]{3,50})<\/div>/i,
        /<span[^>]*class="[^"]*artist[^"]*"[^>]*>([^<]{3,50})<\/span>/i
    ];
    
    for (const pattern of artistPatterns) {
        const match = html.match(pattern);
        if (match) {
            const potentialArtist = match[1].trim();
            if (potentialArtist.length > 3 && potentialArtist.length < 50 &&
                !potentialArtist.toLowerCase().includes('exhibition') &&
                !potentialArtist.toLowerCase().includes('gallery')) {
                artist = potentialArtist;
                break;
            }
        }
    }
    
    if (title && title.length > 5) {
        exhibitions.push({
            id: `${gallery.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
            title: title,
            artist: artist,
            gallery: gallery.name,
            district: gallery.district,
            city: gallery.city,
            startDate: startDate,
            endDate: endDate,
            type: 'gallery',
            description: `Current exhibition at ${gallery.name}`,
            website: gallery.website,
            verified: true
        });
    }
    
    return exhibitions;
}

// 主函数
async function main() {
    console.log('========================================');
    console.log('Direct Gallery Website Scraper');
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log('========================================\n');
    
    const allGalleries = [];
    const allExhibitions = [];
    
    for (const [city, galleries] of Object.entries(KNOWN_GALLERIES)) {
        console.log(`\n=== ${city} ===`);
        
        for (const gallery of galleries) {
            gallery.city = city;
            allGalleries.push(gallery);
            
            process.stdout.write(`Scraping ${gallery.name}... `);
            
            try {
                await delay(2000 + Math.random() * 2000); // 礼貌延迟
                
                const result = await fetch(gallery.website);
                
                if (result.status === 200) {
                    const exhibitions = extractExhibitionInfo(result.data, gallery);
                    allExhibitions.push(...exhibitions);
                    process.stdout.write(`${exhibitions.length} exhibitions found\n`);
                } else {
                    process.stdout.write(`HTTP ${result.status}\n`);
                }
            } catch (err) {
                process.stdout.write(`Error: ${err.message}\n`);
            }
        }
    }
    
    console.log('\n========================================');
    console.log('Scraping Summary');
    console.log('========================================');
    console.log(`Total galleries: ${allGalleries.length}`);
    console.log(`Total exhibitions found: ${allExhibitions.length}`);
    
    // 按城市统计
    for (const city of ['New York', 'Beijing', 'Shanghai', 'Hong Kong']) {
        const cityCount = allExhibitions.filter(e => e.city === city).length;
        console.log(`  ${city}: ${cityCount} exhibitions`);
    }
    
    // 保存数据
    console.log('\nSaving data...');
    
    const data = {
        lastUpdated: new Date().toISOString(),
        nextUpdate: '2025-03-02T03:00:00Z',
        dataSource: 'Scraped from gallery websites',
        stats: {
            totalGalleries: allGalleries.length,
            totalExhibitions: allExhibitions.length
        },
        cities: {}
    };
    
    for (const city of ['New York', 'Beijing', 'Shanghai', 'Hong Kong']) {
        const cityGalleries = allGalleries.filter(g => g.city === city);
        const cityExhibitions = allExhibitions.filter(e => e.city === city);
        
        data.cities[city] = {
            galleryCount: cityGalleries.length,
            exhibitionCount: cityExhibitions.length,
            galleries: cityGalleries,
            exhibitions: cityExhibitions
        };
    }
    
    // 保存 JSON
    const outputDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(outputDir, 'exhibitions.json'), JSON.stringify(data, null, 2));
    
    // 生成 data.js
    const dataJs = `const EXHIBITION_DATA = ${JSON.stringify(data, null, 2)};
if (typeof module !== 'undefined' && module.exports) module.exports = EXHIBITION_DATA;`;
    fs.writeFileSync(path.join(__dirname, '..', 'art-market-viz', 'data.js'), dataJs);
    
    console.log('Data saved successfully!');
    console.log('\nNext update scheduled: 2025-03-02 03:00:00');
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
