# Jean-Herve Donchi — Portfolio

A single-page portfolio application for a backend developer. Presents projects, blog posts, skills, and a contact form. Content is managed through Contentful CMS and deployed to GitHub Pages via CI/CD.

## Stack

| Concern | Technology | Role |
|---------|-----------|------|
| Framework | React 19 | UI rendering |
| Build | Create React App (react-scripts 5 / webpack) | Bundling, dev server, test runner |
| Routing | react-router-dom v7 | Client-side SPA routing |
| Styling | Tailwind CSS 3 + inline styles | Utility layout + component-specific palette |
| Typography | `@tailwindcss/typography` (prose) | Blog article rendering |
| Animation | Motion (Framer Motion) | Scroll-triggered and staggered entry animations |
| CMS | Contentful SDK v11 | Project and blog content at runtime |
| Contact | EmailJS (emailjs-com v3) | Client-side email relay |
| Icons | react-icons | Social links and skill cards |
| CI/CD | GitHub Actions → GitHub Pages | Build on push to `prod`, deploy to Pages |
| Testing | Jest + React Testing Library | Unit/integration (smoke test only) |

## Architecture

### Routing & Page Composition

Two substantive routes plus a catch-all 404. The home page renders as a single vertically-scrollable composition of section components, each anchored by an `id` for hash-based navigation. Hash fragments (`#about`, `#projects`, etc.) are handled by the `useScrollToHash` hook (smooth-scrolls within the home page) or by a full-page redirect when navigating from another route.

```
<BrowserRouter>
  ├── /          → Home    → Navbar → Hero → About → Skills → Projects → Blogs → Contact → Footer
  ├── /blog/:id  → BlogDetails → Navbar → Article (cover + rich-text body + share) → Footer
  └── *          → 404 (inline)
```

### Data Flow

All data originates from Contentful CMS. Components fetch on mount via `useEffect` → service functions in `src/services/service.js` → Contentful SDK. State is entirely component-local (`useState`); there is no global store, context, or cache layer.

The Contentful client is configured against the **preview API** (`preview.contentful.com`) rather than the CDN delivery API — meaning content served may include unpublished drafts.

### Contact Form

Client-side validation (required fields, email regex, 5000-character message cap) gates submission. The `useEmail` hook wraps EmailJS, managing send lifecycle and auto-clearing success/error notices after 3 seconds.

## Project Structure

```
src/
├── components/           # All UI is section-organized
│   ├── Navbar.jsx        # Fixed nav: active-section highlighting, mobile hamburger drawer
│   ├── Hero.jsx          # Landing: typed animation (react-typed), two CTAs (contact / resume PDF)
│   ├── About.jsx         # Bio section with profile image and decorative accents
│   ├── Skills.jsx        # 6-card grid with staggered scale-in animations
│   ├── Projects.jsx      # CMS-driven cards, category filter bar, hover overlay, stack modal
│   ├── Blogs.jsx         # CMS-driven cards, progressive load-more (×2 each click)
│   ├── BlogPost.jsx      # Thin wrapper around custom Contentful rich-text renderer
│   ├── Contact.jsx       # Validated form with loading/success/error states
│   ├── Footer.jsx        # Social links + copyright
│   └── ScrollToTop.jsx   # Side-effect component: resets scroll on route change (renders null)
├── pages/
│   ├── home.jsx          # Single-page landing assembler
│   └── blogDetails.jsx   # Dynamic blog article route (/blog/:id) with loading skeleton
├── hooks/
│   ├── useScrollToHash.js  # Watches URL hash → smooth-scrolls to matching element
│   └── useEmail.js         # EmailJS lifecycle (send, loading, success, error, auto-dismiss)
├── services/
│   ├── service.js           # Contentful data layer: projects, blogs, project stack items
│   ├── emailService.js      # EmailJS send wrapper
│   └── renderRichText.js    # Custom recursive Contentful rich-text → JSX (handles headings, lists, hr, links, text marks)
├── data/
│   ├── content.js           # Contentful client instance (preview endpoint)
│   └── emailCredentials.js  # EmailJS service/template/public key constants
├── App.js              # BrowserRouter + <Routes> + <ScrollToTop>
└── index.js            # React.StrictMode + DOM mount + web vitals reporting
```

## Design Decisions

These are observations based on the code, not prescribed rationale:

- **CRA over Vite/Next.js.** The project uses `react-scripts` (webpack). A `vite` dev dependency exists but is not wired into the build. The site's static nature (no SSR, no API routes) makes CRA sufficient; the trade-off is slower dev startup and build times compared to Vite.
- **Component-local state.** Every component owns its own `useState` — no Context, Redux, or external store. For a single-page site with isolated data-fetching per section, this avoids unnecessary abstraction.
- **Custom rich-text renderer.** Despite `@contentful/rich-text-react-renderer` being installed, the project uses a handwritten recursive renderer. This gives full control over markup but means the renderer must be maintained as new node types are added.
- **Hybrid styling.** The layout/typography layer is Tailwind; colors and interactive states use inline `style` objects with a hardcoded dark palette (`#101F28`, `#141D26`, `#18232D`). This mix works but creates two styling surfaces that must stay consistent.
- **Preview API for production.** The Contentful client points to `preview.contentful.com`. This may be intentional during development but means the deployed site can serve unpublished content.

## Deployment

Pushes to the `prod` branch trigger `pages-deploy.yml`:

1. `actions/checkout@v4`
2. `actions/setup-node@v4` (Node 18, `npm ci`)
3. `npm run build` → `./build`
4. `actions/upload-pages-artifact@v4` → `actions/deploy-pages@v4`

Manual deploys via `workflow_dispatch`. Concurrency is `pages` group, `cancel-in-progress: false`.

## Testing

`App.test.js` contains a single smoke test that renders `<App />` and asserts the presence of "learn react" — a CRA default that no longer exists in the DOM. The test suite currently fails. `@testing-library/jest-dom` matchers are configured in `setupTests.js`.

## Areas for Improvement

These are observable issues in the current codebase that would benefit from attention:

1. **Credentials in source.** Contentful access tokens and EmailJS keys are committed as plaintext string literals. They should be moved to a `.env` file referenced through `process.env` at build time.
2. **Broken test.** `App.test.js` asserts against default CRA boilerplate text and needs to be updated to reflect the actual application content.
3. **Production CMS endpoint.** Switching the Contentful client from `preview.contentful.com` to `cdn.contentful.com` would ensure only published content reaches users.
4. **Dependency cleanup.** `vite` (unused), `emailjs` v4 (unused — code uses `emailjs-com` v3), `lucide-react` (unused), and `@contentful/rich-text-react-renderer` (unused — custom renderer) are installed but not referenced.

## Local Development

```bash
npm install        # Install dependencies
npm start          # Dev server at http://localhost:3000
npm test           # Test runner (watch mode)
npm run build      # Production bundle → ./build
```

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
