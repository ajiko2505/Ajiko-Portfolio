# Restructure into a multi-route site

Right now everything lives on `/` with hash anchors (`#work`, `#about`, `#services`, `#contact`). That's fine visually but weak structurally — each section shares the same title, description, og tags, and analytics pageview, and none are individually shareable or indexable.

I'll split it into proper routes under a shared layout, each with its own `head()` metadata, while keeping the visual design identical.

## New route map

```
src/routes/
  __root.tsx              → providers + shell (unchanged)
  _site.tsx               → shared layout: fixed header, skip link, <main>, footer
  _site.index.tsx         → /          Home (hero + condensed highlights)
  _site.work.tsx          → /work      Selected work (masonry grid)
  _site.about.tsx         → /about     Studio / bio
  _site.services.tsx      → /services  Craft + process
  _site.contact.tsx       → /contact   Contact form + channels
  work.$slug.tsx          → /work/:slug   (existing — unchanged)
  sitemap[.]xml.ts        → /sitemap.xml  (updated to include new routes)
```

The `_site` pathless layout owns the header, nav, skip link, `<main>` landmark, and footer so they render once and each page's content slots into `<Outlet />`.

## Per-page SEO

Each leaf route gets its own `head()`:

| Route      | Title                                          | Description                                          |
|------------|------------------------------------------------|------------------------------------------------------|
| `/`        | Ajiko Fidelis — Designer & Developer           | Portfolio intro                                      |
| `/work`    | Work — Ajiko Fidelis                           | Selected case studies                                |
| `/about`   | About — Ajiko Fidelis                          | Studio of one, three verbs                           |
| `/services`| Services — Ajiko Fidelis                       | Product design, front-end, systems, brand            |
| `/contact` | Contact — Ajiko Fidelis                        | Get in touch — WhatsApp, LinkedIn, email             |

Each also gets matching `og:title`, `og:description`, `og:url`, `twitter:*`, and a leaf-level `canonical`. Home keeps the Person JSON-LD. Case-study route already has its own head/JSON-LD.

## Navigation

Header nav becomes real routed links using `<Link to="/work">` etc., with `activeProps` for the current-page state (also sets `aria-current="page"`). The "Hire me →" button becomes `<Link to="/contact">`.

## Home page content

`/` becomes a true landing page: hero + marquee, a 3-item "recent work" preview grid that links to `/work`, and a short CTA strip pointing to `/contact`. The full grid, about text, services grid, and contact form move to their dedicated routes.

## Sitemap

`src/routes/sitemap[.]xml.ts` gets updated to enumerate `/`, `/work`, `/about`, `/services`, `/contact`, and every `/work/:slug`.

## Files touched

- Add: `_site.tsx`, `_site.index.tsx`, `_site.work.tsx`, `_site.about.tsx`, `_site.services.tsx`, `_site.contact.tsx`
- Edit: `sitemap[.]xml.ts` (add new routes), `work.$slug.tsx` (link back to `/work` instead of `/`)
- Delete: current `index.tsx` (its content is split across the new files)
- Unchanged: `__root.tsx`, `ContactForm.tsx`, `ThemeToggle.tsx`, `projects.ts`, `theme.tsx`, `analytics.ts`, `styles.css`

## Technical notes

- `_site` is a pathless layout (underscore prefix) so URLs stay clean (`/about`, not `/site/about`).
- Header links use `<Link to="/...">`, never `<a href>`, so client navigation, preloading, and type safety all work.
- Existing hash anchors like `#top` are removed since sections are now real routes.
- No changes to data, theming, or backend — this is a pure structural refactor of the frontend.
