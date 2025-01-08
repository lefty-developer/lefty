const esmRequire = require('esm')(module)
const { routes } = esmRequire('../src/routes.js')
const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')
const fs = require('fs')
const path = require('path')

async function generateSitemap() {
  try {
    const data = await routes()
    if (!data || !data.success) {
      throw new Error('Failed to fetch routes')
    }

    const stream = new SitemapStream({ hostname: 'https://lefty.dev' })
    
    // Create a list of URLs
    const links = data.routes.map(route => ({
      url: route.path,
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString()
    }))

    // Create sitemap from stream
    const sitemap = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then(data => data.toString())

    // Write sitemap to public directory
    const publicPath = path.join(__dirname, '../public/sitemap.xml')
    fs.writeFileSync(publicPath, sitemap)

    console.log('Sitemap generated successfully!')
  } catch (error) {
    console.error('Error generating sitemap:', error)
    process.exit(1)
  }
}

generateSitemap()