#!/usr/bin/env node
/**
 * Real Gallery Exhibition Scraper
 * Phase 1: 从聚合网站抓取画廊列表
 * Phase 2: 逐个抓取每家画廊的展览信息
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 简单的 HTTP 请求函数
function fetch(url, options = {}) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https:') ? https : http;
        const req = client.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
                ...options.headers
            },
            timeout: 30000
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                fetch(new URL(res.headers.location, url).toString(), options).then(resolve).catch(reject);
                return;
            }
            
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
        });
        
        req.on('error', reject);
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

// 延迟函数
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 从 GalleriesNow 抓取纽约画廊
async function scrapeGalleriesNowNY() {
    console.log('Scraping GalleriesNow New York...');
    const galleries = [];
    
    try {
        const result = await fetch('https://www.galleriesnow.net/exhibitions/new-york/');
        if (result.status === 200) {
            // 提取画廊名称和链接
            const galleryMatches = result.data.match(/href="([^"]*galleriesnow\.net\/gallery\/[^"]*)"[^>]*>\s*<h3[^>]*>([^<]+)<\/h3>/gi);
            if (galleryMatches) {
                for (const match of galleryMatches.slice(0, 50)) {
                    const urlMatch = match.match(/href="([^"]+)"/);
                    const nameMatch = match.match(/<h3[^>]*>([^<]+)<\/h3>/);
                    if (urlMatch && nameMatch) {
                        galleries.push({
                            name: nameMatch[1].trim(),
                            url: urlMatch[1].startsWith('http') ? urlMatch[1] : `https://www.galleriesnow.net${urlMatch[1]}`,
                            city: 'New York',
                            district: 'Various',
                            source: 'GalleriesNow'
                        });
                    }
                }
            }
        }
    } catch (err) {
        console.error('Error scraping GalleriesNow NY:', err.message);
    }
    
    console.log(`  Found ${galleries.length} galleries from GalleriesNow NY`);
    return galleries;
}

// 从 Ocula 抓取画廊
async function scrapeOcula(city) {
    console.log(`Scraping Ocula ${city}...`);
    const galleries = [];
    
    const citySlug = city.toLowerCase().replace(' ', '-');
    const url = `https://ocula.com/cities/${citySlug}/${citySlug}-art-galleries/`;
    
    try {
        const result = await fetch(url);
        if (result.status === 200) {
            // 提取画廊信息
            const matches = result.data.match(/<a[^>]*href="([^"]*ocula\.com\/institutions\/[^"]*)"[^>]*class="[^"]*card-link[^"]*"[^>]*>/gi);
            if (matches) {
                for (const match of matches.slice(0, 50)) {
                    const urlMatch = match.match(/href="([^"]+)"/);
                    if (urlMatch) {
                        const galleryUrl = urlMatch[1].startsWith('http') ? urlMatch[1] : `https://ocula.com${urlMatch[1]}`;
                        // 从 URL 提取画廊名
                        const nameMatch = galleryUrl.match(/institutions\/([^\/]+)/);
                        const name = nameMatch ? nameMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown';
                        
                        galleries.push({
                            name: name,
                            url: galleryUrl,
                            city: city,
                            district: 'Various',
                            source: 'Ocula'
                        });
                    }
                }
            }
        }
    } catch (err) {
        console.error(`Error scraping Ocula ${city}:`, err.message);
    }
    
    console.log(`  Found ${galleries.length} galleries from Ocula ${city}`);
    return galleries;
}

// 从 Art-Collecting.com 抓取纽约画廊
async function scrapeArtCollectingNY() {
    console.log('Scraping Art-Collecting.com New York...');
    const galleries = [];
    
    try {
        const result = await fetch('https://art-collecting.com/galleries_ny.htm');
        if (result.status === 200) {
            // 提取画廊名和网站
            const matches = result.data.match(/<strong>([^<]+)<\/strong>\s*<br>[^<]*Location:[^<]*<br>[^<]*website:\s*<a[^>]*href="([^"]+)"/gi);
            if (matches) {
                for (const match of matches.slice(0, 100)) {
                    const nameMatch = match.match(/<strong>([^<]+)<\/strong>/);
                    const urlMatch = match.match(/href="([^"]+)"/);
                    if (nameMatch && urlMatch) {
                        galleries.push({
                            name: nameMatch[1].trim(),
                            url: urlMatch[1].startsWith('http') ? urlMatch[1] : `https://${urlMatch[1]}`,
                            city: 'New York',
                            district: 'Various',
                            source: 'Art-Collecting'
                        });
                    }
                }
            }
        }
    } catch (err) {
        console.error('Error scraping Art-Collecting:', err.message);
    }
    
    console.log(`  Found ${galleries.length} galleries from Art-Collecting`);
    return galleries;
}

// 抓取特定画廊的展览信息
async function scrapeGalleryExhibitions(gallery) {
    const exhibitions = [];
    
    try {
        // 添加延迟避免请求过快
        await delay(1000 + Math.random() * 2000);
        
        const result = await fetch(gallery.url);
        if (result.status !== 200) {
            return exhibitions;
        }
        
        const html = result.data.toLowerCase();
        
        // 检测是否有"current"、"exhibition"、"展览"等关键词
        const hasExhibition = html.includes('exhibition') || html.includes('current') || 
                             html.includes('展览') || html.includes('current show');
        
        if (!hasExhibition) {
            return exhibitions;
        }
        
        // 尝试提取展览标题（多种模式）
        const titlePatterns = [
            /<h[12][^>]*>([^<]+current[^<]+)<\/h[12]>/i,
            /<h[12][^>]*>([^<]+exhibition[^<]+)<\/h[12]>/i,
            /<div[^>]*class="[^"]*exhibition-title[^"]*"[^>]*>([^<]+)<\/div>/i,
            /<h[12][^>]*>([^<]{10,100})<\/h[12]>/
        ];
        
        let title = null;
        for (const pattern of titlePatterns) {
            const match = result.data.match(pattern);
            if (match) {
                title = match[1].trim();
                if (title.length > 5 && title.length < 200) break;
            }
        }
        
        // 尝试提取日期
        const datePatterns = [
            /(\w+\s+\d{1,2},?\s+202[56])\s*[-–]\s*(\w+\s+\d{1,2},?\s+202[56])/i,
            /(\d{1,2}\/\d{1,2}\/202[56])\s*[-–]\s*(\d{1,2}\/\d{1,2}\/202[56])/,
            /(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}[-–]/i
        ];
        
        let startDate = new Date().toISOString().split('T')[0];
        let endDate = null;
        
        for (const pattern of datePatterns) {
            const match = result.data.match(pattern);
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
        
        if (title) {
            exhibitions.push({
                id: `${gallery.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
                title: title,
                artist: 'Various Artists',
                gallery: gallery.name,
                district: gallery.district,
                city: gallery.city,
                startDate: startDate,
                endDate: endDate,
                type: 'gallery',
                description: 'Exhibition information scraped from gallery website',
                website: gallery.url,
                verified: false
            });
        }
        
    } catch (err) {
        console.error(`  Error scraping ${gallery.name}:`, err.message);
    }
    
    return exhibitions;
}

// 主抓取函数
async function main() {
    console.log('========================================');
    console.log('Starting Real Gallery Exhibition Scraper');
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log('========================================\n');
    
    // Phase 1: 抓取画廊列表
    console.log('=== PHASE 1: Collecting Gallery Lists ===\n');
    
    const allGalleries = [];
    
    // 纽约
    const nyGalleries1 = await scrapeGalleriesNowNY();
    const nyGalleries2 = await scrapeArtCollectingNY();
    const nyGalleries3 = await scrapeOcula('New York');
    
    // 北京、上海、香港
    const bjGalleries = await scrapeOcula('Beijing');
    await delay(2000);
    const shGalleries = await scrapeOcula('Shanghai');
    await delay(2000);
    const hkGalleries = await scrapeOcula('Hong Kong');
    
    // 合并去重
    const galleryMap = new Map();
    for (const g of [...nyGalleries1, ...nyGalleries2, ...nyGalleries3, ...bjGalleries, ...shGalleries, ...hkGalleries]) {
        const key = `${g.name}-${g.city}`;
        if (!galleryMap.has(key)) {
            galleryMap.set(key, g);
        }
    }
    
    allGalleries.push(...galleryMap.values());
    
    console.log(`\n=== Phase 1 Complete ===`);
    console.log(`Total unique galleries: ${allGalleries.length}`);
    console.log(`  New York: ${allGalleries.filter(g => g.city === 'New York').length}`);
    console.log(`  Beijing: ${allGalleries.filter(g => g.city === 'Beijing').length}`);
    console.log(`  Shanghai: ${allGalleries.filter(g => g.city === 'Shanghai').length}`);
    console.log(`  Hong Kong: ${allGalleries.filter(g => g.city === 'Hong Kong').length}`);
    
    // Phase 2: 抓取展览信息
    console.log('\n=== PHASE 2: Scraping Exhibition Details ===\n');
    
    const allExhibitions = [];
    const maxGalleriesToScrape = 100; // 限制数量避免运行太久
    const galleriesToScrape = allGalleries.slice(0, maxGalleriesToScrape);
    
    console.log(`Scraping ${galleriesToScrape.length} galleries (limited for this run)...`);
    
    for (let i = 0; i < galleriesToScrape.length; i++) {
        const gallery = galleriesToScrape[i];
        process.stdout.write(`[${i + 1}/${galleriesToScrape.length}] ${gallery.name}... `);
        
        const exhibitions = await scrapeGalleryExhibitions(gallery);
        allExhibitions.push(...exhibitions);
        
        process.stdout.write(`${exhibitions.length} exhibitions\n`);
    }
    
    console.log(`\n=== Phase 2 Complete ===`);
    console.log(`Total exhibitions found: ${allExhibitions.length}`);
    
    // 保存数据
    console.log('\n=== Saving Data ===');
    
    const data = {
        lastUpdated: new Date().toISOString(),
        nextUpdate: '2025-03-02T03:00:00Z',
        dataSource: 'Real-time scraped from gallery websites',
        stats: {
            totalGalleries: allGalleries.length,
            totalExhibitions: allExhibitions.length,
            scrapedGalleries: galleriesToScrape.length
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
    
    const outputFile = path.join(outputDir, 'exhibitions.json');
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
    console.log(`Data saved to: ${outputFile}`);
    
    // 生成 data.js
    const dataJsContent = `// Auto-generated exhibition data
// Last updated: ${data.lastUpdated}
// Next update: ${data.nextUpdate}
// Source: ${data.dataSource}

const EXHIBITION_DATA = ${JSON.stringify(data, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EXHIBITION_DATA;
}
`;
    
    const dataJsFile = path.join(__dirname, '..', 'art-market-viz', 'data.js');
    fs.writeFileSync(dataJsFile, dataJsContent);
    console.log(`Data JS saved to: ${dataJsFile}`);
    
    console.log('\n========================================');
    console.log('Scraping Complete!');
    console.log('========================================');
    console.log(`Galleries: ${allGalleries.length}`);
    console.log(`Exhibitions: ${allExhibitions.length}`);
    console.log(`Scraped: ${galleriesToScrape.length} gallery websites`);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
