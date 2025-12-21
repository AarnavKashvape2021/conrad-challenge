# Quick Content Editing Guide

## 🎯 One File to Rule Them All

**All content is in:** `content/content.json`

## 📝 Common Edits

### Change Site Title
```json
"site": {
  "title": "Your New Title"
}
```

### Update Hero Section (Home Page)
```json
"home": {
  "hero": {
    "title": "Your Title",
    "subtitle": "Your Subtitle",
    "image": "assets/your-image.jpg"
  }
}
```

### Add a Team Member
Add to `team.members` array:
```json
{
  "name": "Name",
  "role": "Role",
  "photo": "assets/team/photo.jpg",
  "bio": "Bio text"
}
```

### Add a Feature
Add to `innovation.features` array:
```json
{
  "title": "Feature Name",
  "description": "Feature description"
}
```

## ⚠️ Remember

- ✅ Edit `content/content.json` ONLY
- ❌ Don't edit HTML, CSS, or JS files
- ✅ Use valid JSON (check commas, quotes, brackets)
- ✅ Test in browser after changes

## 🖼️ Images

1. Put images in `assets/` folder
2. Update path in `content.json`
3. Use format: `"assets/folder/image.jpg"`

## 🚀 Test Locally

Open `index.html` in your web browser to see changes!

