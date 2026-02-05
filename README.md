# Jack Gunsten Portfolio

A modern portfolio website built with Next.js 16, React 19, and Tailwind CSS 4. Optimized for deployment on Vercel.

## Features

- Responsive design with modern UI
- Project showcase with image carousels and lightbox
- Dynamic project data fetched from Google Sheets
- Continuous scrolling technology marquee
- SEO optimized with Open Graph and Twitter cards
- Performance optimized for Core Web Vitals

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + Tailwind CSS 4
- **Deployment**: Vercel
- **Data**: Google Sheets (public CSV export)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # React components
├── data/          # Static data and types
└── lib/           # Utility functions (Google Sheets fetcher)
```

## Configuration

### Google Sheets Integration

Projects are fetched from a public Google Sheet. To use your own sheet:

1. Create a Google Sheet with columns: Title, Description, Image1-5, Tags, Link, Featured
2. Make the sheet publicly viewable
3. Update `SHEET_ID` in `src/lib/googleSheets.ts`

### Images

- Local images: Place in `public/images/`
- Remote images: Google Drive links are automatically converted

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jgunsten12/ai-portfolio)

1. Push to GitHub
2. Import project in Vercel
3. Deploy (no environment variables required)

The site will auto-deploy on every push to the main branch.
