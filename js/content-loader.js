/**
 * Content Loader
 * Dynamically loads and renders content from content.json
 * 
 * HOW TO USE:
 * - All content is stored in content/content.json
 * - Edit content.json to update any text, images, or links
 * - No code changes needed!
 */

let contentData = null;

// Embedded fallback content (used when fetching content/content.json fails,
// e.g., when opening files directly without a local server).
const FALLBACK_CONTENT = {
    "site": {
        "title": "Electrodynamic Tether Deorbiting System",
        "subtitle": "A Conrad Challenge Innovation Stage Project",
        "logo": "assets/logo.jpeg"
    },
    "navigation": {
        "items": [
            { "label": "Home", "href": "index.html" },
            { "label": "Innovation", "href": "innovation.html" },
            { "label": "Resources", "href": "resources.html" },
            { "label": "Team", "href": "team.html" },
            { "label": "Impact", "href": "impact.html" }
        ]
    },
    "innovation": {
        "overview": {
            "title": "Overview",
            "description": "Our innovation is an electrodynamic tether–based deorbiting system designed for small satellites. Once deployed, the conductive tether interacts with Earth’s magnetic field to generate a Lorentz force that gradually reduces orbital energy, enabling controlled atmospheric reentry without the use of propellant. The system is lightweight, passive after deployment, and engineered for high reliability."
        },
        "howItWorks": {
            "title": "How It Works",
            "description": "When the conductive tether is deployed from the satellite, it moves through Earth’s magnetic field at orbital velocity. This motion induces an electric current along the tether, which in turn experiences a Lorentz force opposing the satellite’s direction of motion. This force continuously removes orbital energy, lowering the satellite’s altitude over time until it safely reenters the atmosphere and burns up."
        },
        "features": [
            { "title": "Propellant-Free Deorbiting", "description": "Uses Earth’s magnetic field instead of fuel, eliminating mass penalties and propulsion system complexity." },
            { "title": "Dual-Redundant Deployment", "description": "A spring-based mechanical deployment system with redundancy ensures reliable tether release even in the event of partial failure." },
            { "title": "Low Mass and Passive Operation", "description": "Designed for small satellites, the system requires minimal power and operates passively after deployment." }
        ]
    },
    "resources": {
        "pageTitle": "Additional Resources",
        "description": "Explore our supplementary materials, including flowcharts, system architecture, and more.",
        "items": [
            { "title": "Failure Modes Analysis and Effects", "description": "A comprehensive document summarizing the possible failure modes and their effects.", "type": "document", "file": "assets/D_FMEA.pdf", "thumbnail": "#" },
            { "title": "System Architecture flowchart", "description": "A flowchart summarizing the system architecture.", "type": "image", "file": "assets/system-diagram.jpg", "thumbnail": "assets/system-diagram.jpg" },
            { "title": "Electronics control flowchart", "description": "A flowchart summarizing the electronics control system.", "type": "image", "file": "assets/electronics-control-flowchart.jpg", "thumbnail": "assets/electronics-control-flowchart.jpg" },
            { "title": "CAD model", "description": "Static CAD used to validate volumetric feasibility, restraint geometry, and door clearance. Model is not intended to represent final kinematics.", "type": "image", "file": "assets/cad-model.png", "thumbnail": "assets/cad-model.png" },
            { "title": "Adoption barrier map", "description": "A table summarizing the previous adoption barriers for EDTs which the system tries to address.", "type": "document", "file": "assets/file2.pdf", "thumbnail": "#" },
            { "title": "References", "description": "A document summarizing the references used in the project.", "type": "document", "file": "assets/References.pdf", "thumbnail": "#" }
        ]
    },
    "team": {
        "overview": { "title": "Our Team", "description": "We are a student-led team driven by a shared interest in space engineering and sustainability. Our combined skills span physics, electronics, mechanical design, and systems thinking, enabling us to approach orbital debris mitigation with both technical rigor and practical awareness." },
        "members": [
            { "name": "Amaay Gupta", "role": "Systems Architecture & Strategy", "photo": "assets/team/amaay.jpg", "bio": "Leads failure-mode analysis, validation logic, and adoption-focused system design aligned with regulatory and mission risk requirements." },
            { "name": "Arnav", "role": "Engineering & Implementation", "photo": "assets/team/arnav.jpg", "bio": "Translates system requirements into executable designs across physics, CAD, electronics, and deployment mechanisms." }
        ]
    },
    "footer": { "text": "© 2026 Conrad Challenge Innovation Stage Project", "links": [ { "label": "Privacy Policy", "url": "#" }, { "label": "Contact", "url": "#" } ] }
};
/**
 * Load content from JSON file
 */
async function loadContent() {
    try {
        // Add a cache-busting query param to ensure we get a fresh copy
        const url = `content/content.json?_=${Date.now()}`;
        const response = await fetch(url, { cache: 'no-store' });
        if (response.status >= 400) {
            // Fall back to embedded content if fetching fails
            console.warn(`Failed to fetch content/content.json (${response.status}). Using embedded fallback.`);
            contentData = FALLBACK_CONTENT;
            return contentData;
        }
        contentData = await response.json();
        return contentData;
    } catch (error) {
        console.error('Error loading content:', error);
        // Fallback to embedded content so the site still renders when fetch is blocked
        console.warn('Using embedded fallback content.');
        contentData = FALLBACK_CONTENT;
        return contentData;
    }
}

/**
 * Get nested value from object using dot notation path
 * Example: getNestedValue(data, 'home.hero.title')
 */
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Populate elements with data-content attribute
 */
function populateContent() {
    if (!contentData) return;

    // Populate all elements with data-content attribute
    document.querySelectorAll('[data-content]').forEach(element => {
        const path = element.getAttribute('data-content');
        const value = getNestedValue(contentData, path);

        if (value !== undefined && value !== null) {
            if (element.tagName === 'IMG') {
                element.src = value;
            } else if (element.tagName === 'A') {
                element.textContent = value;
            } else {
                element.textContent = value;
            }
        }
    });

    // Handle elements with data-link attribute (for buttons/links)
    document.querySelectorAll('[data-link]').forEach(element => {
        const path = element.getAttribute('data-link');
        const value = getNestedValue(contentData, path);
        if (value) {
            element.href = value;
        }
    });

    // Handle elements with data-src attribute (for images)
    document.querySelectorAll('[data-src]').forEach(element => {
        const path = element.getAttribute('data-src');
        const value = getNestedValue(contentData, path);
        if (value) {
            element.src = value;
            element.alt = value.split('/').pop(); // Use filename as alt
        }
    });

    // Update page title
    const titleElement = document.querySelector('title[data-content]');
    if (titleElement) {
        const path = titleElement.getAttribute('data-content');
        const siteTitle = getNestedValue(contentData, path);
        if (siteTitle) {
            document.title = siteTitle;
        }
    }
}

/**
 * Render navigation menu
 */
function renderNavigation() {
    if (!contentData?.navigation) return;

    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const nav = contentData.navigation;
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navbar.innerHTML = `
        <div class="container">
            <div class="navbar-logo">
                <img src="${contentData.site?.logo || 'assets/logo.jpeg'}" alt="Logo" class="site-logo" onerror="this.src='assets/logo.jpeg'">
                <span class="site-title">${contentData.site?.title || 'Project'}</span>
            </div>
            <button class="navbar-toggle" id="nav-toggle" aria-label="Toggle menu">☰</button>
            <ul class="navbar-menu" id="nav-menu">
                ${nav.items.map(item => `
                    <li>
                        <a href="${item.href}" class="${currentPage === item.href ? 'active' : ''}">
                            ${item.label}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    // Mobile menu toggle
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
}

/**
 * Render footer
 */
function renderFooter() {
    if (!contentData?.footer) return;

    const footer = document.getElementById('footer');
    if (!footer) return;

    const footerData = contentData.footer;
    footer.innerHTML = `
        <div class="container footer-inner">
            <div class="footer-left">
                <img src="${contentData.site?.logo || 'assets/logo.jpeg'}" alt="Logo" class="footer-logo" onerror="this.src='assets/logo.jpeg'">
                <div class="footer-text">${footerData.text || ''}</div>
            </div>
            ${footerData.links && footerData.links.length > 0 ? `
                <ul class="footer-links">
                    ${footerData.links.map(link => `
                        <li><a href="${link.url}">${link.label}</a></li>
                    `).join('')}
                </ul>
            ` : ''}
        </div>
    `;
}

/**
 * Render features list
 */
function renderFeatures() {
    if (!contentData?.innovation?.features) return;

    const container = document.getElementById('features-container');
    if (!container) return;

    const features = contentData.innovation.features;
    container.innerHTML = features.map(feature => `
        <div class="feature-card">
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
    `).join('');
}

/**
 * Render gallery
 */
function renderGallery() {
    if (!contentData?.innovation?.gallery) return;

    const container = document.getElementById('gallery-container');
    if (!container) return;

    const gallery = contentData.innovation.gallery;
    container.innerHTML = gallery.map(item => `
        <div class="gallery-item">
            <img src="${item.image}" alt="${item.caption || 'Gallery image'}" 
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\'%3E%3Crect fill=\\'%23e0e0e0\\' width=\\'400\\' height=\\'300\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' fill=\\'%23999\\' font-family=\\'Arial\\' font-size=\\'14\\'%3EImage Placeholder%3C/text%3E%3C/svg%3E'">
            ${item.caption ? `<div class="gallery-caption">${item.caption}</div>` : ''}
        </div>
    `).join('');
}

/**
 * Render team members
 */
function renderTeam() {
    if (!contentData?.team?.members) return;

    const container = document.getElementById('team-container');
    if (!container) return;

    const members = contentData.team.members;
    container.innerHTML = members.map(member => `
        <div class="team-card">
            <img src="${member.photo}" alt="${member.name}" class="team-photo"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'300\\' height=\\'300\\'%3E%3Crect fill=\\'%23e0e0e0\\' width=\\'300\\' height=\\'300\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' fill=\\'%23999\\' font-family=\\'Arial\\' font-size=\\'16\\'%3EPhoto Placeholder%3C/text%3E%3C/svg%3E'">
            <div class="team-info">
                <div class="team-name">${member.name}</div>
                <div class="team-role">${member.role}</div>
                <div class="team-bio">${member.bio}</div>
            </div>
        </div>
    `).join('');
}

/**
 * Render resources list
 */
function renderResources() {
    if (!contentData?.resources) return;

    const container = document.getElementById('resources-container');
    if (!container) return;

    // Find a single external link resource (e.g., Google Drive) if present
    const items = contentData.resources.items || [];
    const linkItem = items.find(i => i.type === 'link' || (i.file && /^https?:\/\//.test(i.file)));

    // Render a centered description and a prominent link button
    const description = contentData.resources.description || '';
    const linkUrl = linkItem?.file || '#';
    const linkLabel = linkItem?.title || 'Open Project Documents';

    container.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;gap:1rem;">
            <div style="max-width:800px;text-align:center;color:var(--text-secondary);">${description}</div>
            <a class="btn btn-primary" href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkLabel}</a>
        </div>
    `;
}

/**
 * Initialize content loading and rendering
 */
async function initContent() {
    await loadContent();
    if (contentData) {
        populateContent();
        renderNavigation();
        renderFooter();
        renderFeatures();
        renderGallery();
        renderTeam();
        renderResources();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContent);
} else {
    initContent();
}

