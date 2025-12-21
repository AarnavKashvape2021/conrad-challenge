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

/**
 * Load content from JSON file
 */
async function loadContent() {
    try {
        const response = await fetch('content/content.json');
        if (!response.ok) {
            throw new Error(`Failed to load content: ${response.statusText}`);
        }
        contentData = await response.json();
        return contentData;
    } catch (error) {
        console.error('Error loading content:', error);
        // Fallback: show error message
        document.body.innerHTML = `
            <div style="padding: 2rem; text-align: center;">
                <h1>Content Loading Error</h1>
                <p>Unable to load content/content.json</p>
                <p style="color: #666; font-size: 0.875rem;">${error.message}</p>
            </div>
        `;
        return null;
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
            <div class="navbar-logo">${contentData.site?.title || 'Project'}</div>
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
        <div class="container">
            <div class="footer-text">${footerData.text || ''}</div>
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
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContent);
} else {
    initContent();
}

