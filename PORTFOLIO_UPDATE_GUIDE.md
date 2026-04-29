# Portfolio Update Guide

Your portfolio is now fully dynamic and data-driven. All content is managed through a single JSON file, making updates clean, professional, and easy.

## How to Update Your Portfolio

All portfolio content is stored in `/data/portfolio.json`. Simply edit this file to update any section of your website. The changes will automatically reflect across your portfolio.

### File Structure

```json
{
  "personal": { ... },      // Your name, email, social links, resume
  "about": { ... },         // About section content and skills
  "projects": [ ... ],      // Featured projects
  "experience": [ ... ],    // Work experience
  "education": [ ... ],     // Education history
  "contact": { ... }        // Contact section text
}
```

---

## Personal Information

**File**: `data/portfolio.json` → `personal`

Update your name, tagline, bio, email, and social links:

```json
"personal": {
  "name": "Rohan",
  "headline": "Igniting Innovation",
  "tagline": "Shaping the Future of Tech",
  "bio": "CS Sophomore @ VIT Chennai | Full-Stack Developer @ MIC | AI/ML Explorer | Design Lead @ OSPC",
  "email": "skulpeace@gmail.com",
  "linkedin": "https://www.linkedin.com/in/your-profile",
  "github": "https://github.com/your-username",
  "resume": "/resume.pdf"
}
```

---

## About Section

**File**: `data/portfolio.json` → `about`

### Update Your Description

```json
"about": {
  "title": "About Me",
  "description": "Your bio goes here...",
  "taglines": [
    { "text": "Web Developer", "article": "a" },
    { "text": "AI/ML Explorer", "article": "an" },
    { "text": "Your Role", "article": "a/an" }
  ],
  "skills": {
    "languages": ["JavaScript", "TypeScript", ...],
    "frameworks": ["React", "Next.js", ...],
    "tools": ["Git", "Docker", ...]
  },
  "badges": ["Full-Stack", "UI/UX", "Performance", "Scalability"]
}
```

### How to Add More Taglines

Simply add more objects to the `taglines` array:

```json
"taglines": [
  { "text": "Web Developer", "article": "a" },
  { "text": "DevOps Engineer", "article": "a" },
  { "text": "Open Source Contributor", "article": "an" }
]
```

The taglines will rotate every 4 seconds in the About section.

### Update Skills

Update the three skill categories (languages, frameworks, tools):

```json
"skills": {
  "languages": ["JavaScript", "TypeScript", "Python", "Rust"],
  "frameworks": ["React", "Next.js", "Vue", "Svelte"],
  "tools": ["Git", "Docker", "Kubernetes", "AWS"]
}
```

### Update Badges

Update the featured badges shown at the bottom of the About section:

```json
"badges": ["Full-Stack", "DevOps", "Cloud Architecture", "Team Leadership"]
```

---

## Projects Section

**File**: `data/portfolio.json` → `projects`

### Add a New Project

```json
"projects": [
  {
    "id": "3",
    "title": "Your Project Title",
    "description": "Short description shown in the card",
    "fullDescription": "Detailed description shown in the modal popup",
    "tech": ["React", "Node.js", "MongoDB"],
    "github": "https://github.com/your-username/project",
    "demo": "https://live-demo-link.com",
    "image": "/project-image.jpg"
  }
]
```

### Important Notes

- **id**: Must be unique (use incrementing numbers: "1", "2", "3", etc.)
- **demo**: Set to `"#"` if no live demo is available
- **image**: Place image files in the `/public` folder and reference them

---

## Experience Section

**File**: `data/portfolio.json` → `experience`

### Add or Update Experience

```json
"experience": [
  {
    "company": "Company Name",
    "role": "Your Job Title",
    "period": "Jan 2025 – Present",
    "description": "What you do/did at this company",
    "skills": ["Skill 1", "Skill 2", "Skill 3"]
  }
]
```

---

## Education Section

**File**: `data/portfolio.json` → `education`

### Add or Update Education

```json
"education": [
  {
    "institution": "University Name",
    "degree": "B.Tech, Your Field",
    "period": "Jun 2024 – Jul 2028",
    "location": "City, Country"
  }
]
```

---

## Contact Section

**File**: `data/portfolio.json` → `contact`

Update the heading and subtitle for the contact section:

```json
"contact": {
  "title": "Let's Connect",
  "subtitle": "I'm always interested in hearing about new projects and opportunities..."
}
```

---

## Making Changes

1. Open `/data/portfolio.json` in your editor
2. Make changes to the appropriate section
3. Save the file
4. Your portfolio website will automatically update

## Example: Complete Update

Here's what a complete update might look like:

```json
{
  "personal": {
    "name": "Your Name",
    "headline": "Your Headline",
    "tagline": "Your Tagline",
    "bio": "Your full bio with roles and institutions",
    "email": "your@email.com",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourprofile",
    "resume": "/resume.pdf"
  },
  "about": {
    "title": "About Me",
    "description": "Your bio paragraph...",
    "taglines": [
      { "text": "Role 1", "article": "a/an" },
      { "text": "Role 2", "article": "a/an" }
    ],
    "skills": {
      "languages": ["Language 1", "Language 2"],
      "frameworks": ["Framework 1", "Framework 2"],
      "tools": ["Tool 1", "Tool 2"]
    },
    "badges": ["Badge 1", "Badge 2"]
  },
  "projects": [
    {
      "id": "1",
      "title": "Project Title",
      "description": "Short description",
      "fullDescription": "Full description",
      "tech": ["Tech1", "Tech2"],
      "github": "https://github.com/...",
      "demo": "https://demo.com",
      "image": "/project.jpg"
    }
  ],
  "experience": [...],
  "education": [...],
  "contact": {
    "title": "Let's Connect",
    "subtitle": "Contact section text..."
  }
}
```

---

## Tips for Maintaining Your Portfolio

1. **Keep it updated**: Add new projects, update experience, and refresh your skills regularly
2. **Use proper grammar**: Double-check articles (a/an) in taglines
3. **Valid URLs**: Ensure all links to GitHub, LinkedIn, and projects are correct
4. **Image optimization**: Keep project images under 500KB for fast loading
5. **Backup**: Keep a backup of your data/portfolio.json file

---

## Need Help?

The portfolio is fully functional and dynamic. All sections automatically pull content from the JSON file, so you only need to update the data to see changes reflected across your entire website.
