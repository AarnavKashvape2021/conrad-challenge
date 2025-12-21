# Conrad Challenge Innovation Stage Website

A polished, content-editable website shell for Conrad Challenge (Innovation Stage) projects. All content can be edited without modifying any HTML, CSS, or JavaScript code.

## 🎯 Quick Start

1. **Edit Content**: Open `content/content.json` and update all text, images, and links
2. **Add Images**: Place your images in the `assets/` folder and update paths in `content.json`
3. **Deploy**: Upload all files to GitHub Pages, Netlify, Vercel, or any static hosting service

## 📁 Project Structure

```
website/
├── index.html          # Home page
├── innovation.html     # Innovation details page
├── impact.html         # Impact page
├── team.html           # Team page
├── content/
│   └── content.json    # ⭐ ALL EDITABLE CONTENT IS HERE
├── css/
│   └── style.css       # Styles (no content editing needed)
├── js/
│   ├── content-loader.js  # Content loading logic
│   └── app.js             # General functionality
└── assets/             # Place your images here
    ├── hero-image.jpg
    ├── gallery/
    └── team/
```

## ✏️ How to Edit Content

### **IMPORTANT: Only edit `content/content.json` - DO NOT edit HTML, CSS, or JavaScript files!**

### Step 1: Open `content/content.json`

This JSON file contains all website content organized by page.

### Step 2: Edit Content Sections

#### **Site-Wide Settings**
```json
"site": {
  "title": "Your Innovation Project",  // Change this
  "subtitle": "A Conrad Challenge Innovation Stage Project"
}
```

#### **Home Page Content**
```json
"home": {
  "hero": {
    "title": "Your Hero Title",
    "subtitle": "Your tagline",
    "image": "assets/hero-image.jpg",  // Update path to your image
    "ctaText": "Learn More",
    "ctaLink": "innovation.html"
  },
  "problem": {
    "title": "The Problem",
    "description": "Your problem statement here..."
  },
  "innovation": {
    "title": "Our Innovation",
    "summary": "Your innovation summary here..."
  }
}
```

#### **Innovation Page**
```json
"innovation": {
  "overview": {
    "title": "Overview",
    "description": "Your overview text..."
  },
  "howItWorks": {
    "title": "How It Works",
    "description": "Your explanation..."
  },
  "features": [
    {
      "title": "Feature One",
      "description": "Feature description..."
    }
    // Add more features by adding more objects
  ],
  "gallery": [
    {
      "image": "assets/gallery/image1.jpg",
      "caption": "Image caption"
    }
    // Add more images by adding more objects
  ]
}
```

#### **Impact Page**
```json
"impact": {
  "targetUsers": {
    "title": "Target Users",
    "description": "Your target users description..."
  },
  "impactDescription": {
    "title": "Impact",
    "description": "Your impact description..."
  },
  "comparison": {
    "title": "Improvement Over Existing Solutions",
    "description": "Your comparison text..."
  }
}
```

#### **Team Page**
```json
"team": {
  "overview": {
    "title": "Our Team",
    "description": "Team overview..."
  },
  "members": [
    {
      "name": "Team Member Name",
      "role": "Role/Title",
      "photo": "assets/team/member1.jpg",  // Update path
      "bio": "Brief bio or contribution"
    }
    // Add more team members by adding more objects
  ]
}
```

## 🖼️ Adding Images

1. **Create folders** (if they don't exist):
   - `assets/` - for hero images and general images
   - `assets/gallery/` - for gallery images
   - `assets/team/` - for team member photos

2. **Add your images** to these folders

3. **Update paths in `content.json`**:
   ```json
   "image": "assets/your-image.jpg"
   ```

4. **Supported formats**: JPG, PNG, GIF, SVG, WebP

## ➕ Adding/Removing Items

### Add a Feature
In `content.json`, add a new object to the `features` array:
```json
"features": [
  { "title": "Feature 1", "description": "..." },
  { "title": "Feature 2", "description": "..." },
  { "title": "New Feature", "description": "..." }  // ← Add this
]
```

### Add a Team Member
Add a new object to the `members` array:
```json
"members": [
  { "name": "Member 1", "role": "...", "photo": "...", "bio": "..." },
  { "name": "New Member", "role": "...", "photo": "...", "bio": "..." }  // ← Add this
]
```

### Remove Items
Simply delete the object from the array in `content.json`.

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select your branch and folder (usually `root` or `/`)
4. Your site will be live at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository for automatic deployments

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

## 🎨 Customization (Optional)

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
  --primary-color: #2563eb;  /* Change this */
  --primary-dark: #1e40af;
  /* ... other colors ... */
}
```

### Fonts
The site uses system fonts by default. To change, edit `font-family` in `css/style.css`.

## ⚠️ Important Notes

- **Always edit `content/content.json`** - never edit HTML files for content
- **Keep JSON syntax valid** - use commas correctly, close all brackets
- **Test locally** - open `index.html` in a browser to preview changes
- **Image paths** - use relative paths from the root (e.g., `assets/image.jpg`)
- **JSON formatting** - use a JSON validator if you encounter errors

## 🐛 Troubleshooting

### Content not loading?
- Check browser console for errors (F12)
- Verify `content/content.json` is valid JSON
- Ensure file paths are correct

### Images not showing?
- Check image paths in `content.json`
- Verify images exist in the `assets/` folder
- Use forward slashes `/` in paths, not backslashes `\`

### JSON errors?
- Use a JSON validator: https://jsonlint.com/
- Check for missing commas or brackets
- Ensure all strings are in quotes

## 📝 Content Guidelines

- **Be concise**: Judges appreciate clear, focused content
- **Use plain language**: Avoid jargon unless necessary
- **Show impact**: Emphasize real-world benefits
- **Be specific**: Use concrete examples and data when possible
- **Proofread**: Check spelling and grammar before submission

## 📄 License

This website template is provided for Conrad Challenge projects.

---

**Need help?** Check the JSON file structure in `content/content.json` - it's well-commented and self-explanatory!

