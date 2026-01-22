#!/usr/bin/env node

/**
 * Check if diagrams exist, and generate them if missing
 * Used by npm run dev to ensure diagrams are available
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const diagramsDir = path.join(process.cwd(), 'generated', 'diagrams')

function checkDiagrams() {
    // Check if diagrams directory exists and has files
    if (!fs.existsSync(diagramsDir)) {
        console.log('⚠️  Diagrams directory not found. Generating diagrams...\n')
        generateDiagrams()
        return
    }

    const files = fs.readdirSync(diagramsDir, { recursive: true })
    const imageFiles = files.filter(f =>
        typeof f === 'string' && /\.(png|svg)$/i.test(f)
    )

    if (imageFiles.length === 0) {
        console.log('⚠️  No diagram images found. Generating diagrams...\n')
        generateDiagrams()
        return
    }

    console.log(`✅ Found ${imageFiles.length} diagram image(s)`)
}

function generateDiagrams() {
    try {
        console.log('Running: npm run build:diagrams\n')
        execSync('npm run build:diagrams', { stdio: 'inherit' })
        console.log('\n✅ Diagrams generated successfully\n')
    } catch (error) {
        console.error('\n❌ Failed to generate diagrams')
        console.error('   Diagrams may not be visible in the dev server.')
        console.error('   Run manually: npm run build:diagrams\n')
        // Don't exit - allow dev server to start anyway
    }
}

checkDiagrams()
