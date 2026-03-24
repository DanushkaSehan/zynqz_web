# ZynQz — Official Company Website

The official website for **ZynQz Pvt Ltd**, a registered company based in Colombo, Sri Lanka. Built with React and Tailwind CSS, the site showcases ZynQz's services, apparel products, and company information.

🌐 **Live Site:** [www.zynqz.com](https://www.zynqz.com)

---

## Pages & Sections

### Home Page (`/`)
| Section | Description |
|---|---|
| **Hero** | Animated hero with background texture and tagline |
| **Our Apparel** | Product image slideshow with highlights |
| **About Us** | Company background and values |
| **Contact** | EmailJS-powered contact form |

### Services Page (`/services`)
| Section | Description |
|---|---|
| **Product Development** | Bonded garments, sewing, molding, prototyping support |
| **Machinery Solutions** | Machinery selection and production process guidance |

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | ^19.2.3 | UI framework |
| React Router DOM | ^7.13.2 | Page routing |
| Tailwind CSS | ^3.4.17 | Utility-first styling |
| EmailJS | ^4.4.1 | Contact form email delivery |
| Lucide React | ^0.562.0 | Icons |
| gh-pages | ^6.3.0 | GitHub Pages deployment |

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/DanushkaSehan/zynqz_web.git

# Navigate into the project
cd zynqz_web

# Install dependencies
npm install
```

### Run Locally

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads on file changes.

### Build for Production

```bash
npm run build
```

Outputs an optimized production build to the `/build` folder.

### Deploy to GitHub Pages

```bash
npm run deploy
```

Runs `npm run build` first, then publishes the `/build` folder to the `gh-pages` branch.

---

## Project Structure

```
zynqz_web/
├── public/
│   └── index.html
├── src/
│   ├── assets/                  # Images and logo
│   │   ├── logo_web_zynqz.png
│   │   ├── back_hero.png
│   │   ├── breif_1.png
│   │   ├── breif_2.png
│   │   ├── breif_3.png
│   │   ├── machinery_1.jpeg
│   │   └── machinery_2.jpeg
│   ├── App.js                   # Main app + Home page
│   ├── ServicesPage.js          # Services page (Product Dev + Machinery)
│   ├── App.css
│   └── index.js
├── package.json
├── tailwind.config.js
└── README.md
```

---

## Color Theme

| Color | Hex | Usage |
|---|---|---|
| Navy Blue | `#2f3a64` | Primary — headings, navbar, buttons |
| Gold | `#efc07f` | Accent — highlights, underlines, icons |
| White | `#ffffff` | Backgrounds, text on dark |

---

## Contact & Social

| Platform | Link |
|---|---|
| LinkedIn | [ZynQz Pvt Ltd](https://www.linkedin.com/company/zynqz-pvt-ltd/) |
| Instagram | [@zynqz](https://www.instagram.com/zynqz/) |
| WhatsApp | [+94 70 200 9444](https://wa.me/94702009444) |
| Email | zynqzhelp@gmail.com |

---

© 2026 ZynQz Pvt Ltd. All rights reserved.
