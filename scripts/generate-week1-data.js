#!/usr/bin/env node
/**
 * Gallery Exhibition Data Generator
 * 基于已知数据源生成展览数据
 * 第一周：使用已知信息创建基础数据
 */

const fs = require('fs');
const path = require('path');

// 基础画廊数据（从调研中收集）
const BASE_GALLERIES = {
    'New York': [
        { name: 'Gagosian', district: 'Chelsea', website: 'gagosian.com' },
        { name: 'David Zwirner', district: 'Chelsea', website: 'davidzwirner.com' },
        { name: 'Hauser & Wirth', district: 'Chelsea', website: 'hauserwirth.com' },
        { name: 'Pace Gallery', district: 'Chelsea', website: 'pacegallery.com' },
        { name: 'Gladstone Gallery', district: 'Chelsea', website: 'gladstonegallery.com' },
        { name: 'Petzel Gallery', district: 'Chelsea', website: 'petzel.com' },
        { name: 'Lévy Gorvy Dayan', district: 'Upper East Side', website: 'levygorvydayan.com' },
        { name: 'Acquavella Galleries', district: 'Upper East Side', website: 'acquavellagalleries.com' },
        { name: 'Mnuchin Gallery', district: 'Upper East Side', website: 'mnuchingallery.com' },
        { name: 'Galerie Gmurzynska', district: 'Upper East Side', website: 'gmurzynska.com' },
        { name: 'Castelli Gallery', district: 'Upper East Side', website: 'castelligallery.com' },
        { name: 'Skarstedt Gallery', district: 'Upper East Side', website: 'skarstedt.com' },
        { name: 'White Cube', district: 'Upper East Side', website: 'whitecube.com' },
        { name: 'Andrew Edlin Gallery', district: 'Lower East Side', website: 'andrewedlin.com' },
        { name: 'bitforms gallery', district: 'Lower East Side', website: 'bitforms.com' },
        { name: 'Miguel Abreu Gallery', district: 'Lower East Side', website: 'miguelabreugallery.com' },
        { name: 'Sperone Westwater', district: 'Lower East Side', website: 'speronewestwater.com' },
        { name: 'Tibor De Nagy', district: 'Lower East Side', website: 'tibordenagy.com' },
        { name: 'Hauser & Wirth', district: 'SoHo', website: 'hauserwirth.com' },
        { name: 'Jeffrey Deitch', district: 'SoHo', website: 'deitch.com' },
        { name: 'Nino Mier Gallery', district: 'SoHo', website: 'niniomiergallery.com' },
        { name: 'Nicodim New York', district: 'SoHo', website: 'nicodimgallery.com' },
        { name: 'Eden Gallery', district: 'SoHo', website: 'edengallery.com' },
        { name: 'Ronald Feldman Gallery', district: 'SoHo', website: 'feldmangallery.com' }
    ],
    'Beijing': [
        { name: 'UCCA 尤伦斯当代艺术中心', district: '798 Art District', website: 'ucca.org.cn' },
        { name: 'Pace Beijing', district: '798 Art District', website: 'pacegallery.com' },
        { name: 'Gagosian Beijing', district: '798 Art District', website: 'gagosian.com' },
        { name: '长征空间', district: '798 Art District', website: 'longmarchspace.com' },
        { name: '北京公社', district: '798 Art District', website: 'beijingcommune.com' },
        { name: '站台中国', district: '798 Art District', website: 'platformchina.com' },
        { name: '当代唐人艺术中心', district: '798 Art District', website: 'tangcontemporary.com' },
        { name: '蜂巢当代艺术中心', district: '798 Art District', website: 'hivecenter.com' },
        { name: '星空间', district: '798 Art District', website: 'star-gallery.com' },
        { name: '偏锋画廊', district: '798 Art District', website: 'pifo.cn' },
        { name: '索卡艺术', district: '798 Art District', website: 'soka-art.com' },
        { name: '玉兰堂', district: '798 Art District', website: 'line-gallery.com' },
        { name: 'Hi艺术中心', district: '798 Art District', website: 'hiart.cn' },
        { name: '杨画廊', district: '798 Art District', website: 'yanggallery.com.cn' },
        { name: '博而励画廊', district: '798 Art District', website: 'boersligallery.com' }
    ],
    'Shanghai': [
        { name: 'ShanghART Gallery', district: 'West Bund', website: 'shanghartgallery.com' },
        { name: 'Leo Gallery', district: 'West Bund', website: 'leogallery.com.cn' },
        { name: 'Don Gallery', district: 'West Bund', website: 'dongallery.net' },
        { name: '3812 Gallery', district: 'West Bund', website: '3812gallery.com' },
        { name: 'Alisan Fine Arts', district: 'West Bund', website: 'alisan.com.hk' },
        { name: 'ARARIO Gallery', district: 'West Bund', website: 'arariogallery.com' },
        { name: 'Asia Art Center', district: 'West Bund', website: 'asiaartcenter.org' },
        { name: 'Esther Schipper', district: 'West Bund', website: 'estherschipper.com' },
        { name: 'SPURS Gallery', district: 'West Bund', website: 'spursgallery.com' },
        { name: '香格纳画廊', district: 'M50', website: 'shanghartgallery.com' },
        { name: '艺博画廊', district: 'M50', website: 'yibo-gallery.com' },
        { name: 'M艺术空间', district: 'M50', website: 'm-artspace.com' },
        { name: ' Vanguard Gallery', district: 'M50', website: 'vanguardgallery.com' },
        { name: '天线空间', district: 'M50', website: 'antennaspacelab.com' },
        { name: 'BANK画廊', district: 'M50', website: 'bankmabsociety.com' },
        { name: '东画廊', district: 'West Bund', website: 'dongallery.net' },
        { name: '余德耀美术馆', district: 'West Bund', website: 'yuzmshanghai.org' },
        { name: '龙美术馆', district: 'West Bund', website: 'thelongmuseum.org' },
        { name: '西岸美术馆', district: 'West Bund', website: 'westbund.com.cn' }
    ],
    'Hong Kong': [
        { name: 'Gagosian Hong Kong', district: 'Central', website: 'gagosian.com' },
        { name: 'White Cube', district: 'Central', website: 'whitecube.com' },
        { name: 'David Zwirner Hong Kong', district: 'Central', website: 'davidzwirner.com' },
        { name: 'Pearl Lam Galleries', district: 'Central', website: 'pearllam.com' },
        { name: 'Tang Contemporary Art', district: 'Central', website: 'tangcontemporary.com' },
        { name: 'Opera Gallery', district: 'Central', website: 'operagallery.com' },
        { name: '10 Chancery Lane Gallery', district: 'Central', website: '10chancerylanegallery.com' },
        { name: 'Edouard Malingue Gallery', district: 'Sheung Wan', website: 'edouardmalingue.com' },
        { name: 'Above Second Gallery', district: 'Sheung Wan', website: 'above-second.com' },
        { name: '3812 Gallery', district: 'Central', website: '3812gallery.com' },
        { name: 'Ben Brown Fine Arts', district: 'Central', website: 'benbrownfinearts.com' },
        { name: 'Simon Lee Gallery', district: 'Central', website: 'simonleegallery.com' },
        { name: 'Pace Hong Kong', district: 'Central', website: 'pacegallery.com' },
        { name: 'Lehmann Maupin', district: 'Central', website: 'lehmannmaupin.com' },
        { name: 'Sprüth Magers', district: 'Central', website: 'spruethmagers.com' }
    ]
};

// 生成模拟展览数据（第一周使用）
function generateMockExhibitions(galleries, city) {
    const exhibitions = [];
    const now = new Date();
    
    // 为每个画廊生成 0-2 个展览
    for (const gallery of galleries) {
        const numExhibitions = Math.floor(Math.random() * 3); // 0-2
        
        for (let i = 0; i < numExhibitions; i++) {
            const startDate = new Date(now);
            startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30));
            
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 30 + Math.floor(Math.random() * 60));
            
            exhibitions.push({
                id: `${gallery.name.replace(/\s+/g, '-').toLowerCase()}-${i}`,
                title: `${gallery.name} Current Exhibition`,
                artist: 'Various Artists',
                gallery: gallery.name,
                district: gallery.district,
                city: city,
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                type: ['gallery', 'fair', 'auction'][Math.floor(Math.random() * 3)],
                description: 'This is a placeholder exhibition. Real data will be scraped in the next update.',
                image: null,
                website: `https://${gallery.website}`,
                verified: false
            });
        }
    }
    
    return exhibitions;
}

// 主函数
async function main() {
    console.log('Generating gallery exhibition data...');
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log('Note: This is Week 1 - generating base gallery list with mock exhibitions.');
    console.log('Real exhibition data will be scraped starting next week.\n');
    
    const data = {
        lastUpdated: new Date().toISOString(),
        nextUpdate: '2025-03-02T03:00:00Z', // 下周日凌晨3点
        dataSource: 'Base gallery list + mock exhibitions (Week 1)',
        cities: {}
    };
    
    let totalGalleries = 0;
    let totalExhibitions = 0;
    
    for (const [city, galleries] of Object.entries(BASE_GALLERIES)) {
        console.log(`${city}: ${galleries.length} galleries`);
        totalGalleries += galleries.length;
        
        const exhibitions = generateMockExhibitions(galleries, city);
        totalExhibitions += exhibitions.length;
        
        data.cities[city] = {
            galleryCount: galleries.length,
            exhibitionCount: exhibitions.length,
            galleries: galleries,
            exhibitions: exhibitions
        };
    }
    
    console.log(`\nTotal: ${totalGalleries} galleries, ${totalExhibitions} exhibitions`);
    
    // 保存数据
    const outputDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputFile = path.join(outputDir, 'exhibitions.json');
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
    console.log(`\nData saved to: ${outputFile}`);
    
    // 同时生成 data.js 供网站使用
    const dataJsContent = `// Auto-generated exhibition data
// Last updated: ${data.lastUpdated}
// Next update: ${data.nextUpdate}

const EXHIBITION_DATA = ${JSON.stringify(data, null, 2)};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EXHIBITION_DATA;
}
`;
    
    const dataJsFile = path.join(__dirname, '..', 'art-market-viz', 'data.js');
    fs.writeFileSync(dataJsFile, dataJsContent);
    console.log(`Data JS saved to: ${dataJsFile}`);
    
    console.log('\n✅ Week 1 data generation completed!');
    console.log('Next real scrape scheduled for: Sunday, March 2, 2025 at 3:00 AM');
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
