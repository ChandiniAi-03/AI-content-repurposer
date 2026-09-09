# 🤖 AI Content Repurposer

An AI-powered web application that transforms a single article into ready-to-use social media content for **Twitter/X, LinkedIn, and Instagram**.

The application extracts the content from an article URL, processes it using **Gemini AI**, and generates platform-specific content that can be copied instantly or downloaded as a Word document.

---

## 🚀 Features

- 🔗 Extract article content from a URL
- 🕷️ Web scraping using Python
- 🤖 AI-powered content generation using Google Gemini
- 𝕏 Generate Twitter/X threads
- 💼 Generate LinkedIn posts
- 📸 Generate Instagram captions
- 📋 One-click copy buttons
- 📄 Download generated content as a Word document
- ✨ Responsive premium UI
- 🌌 Modern Midnight Aurora Glass design
- 🔐 API key protected using environment variables

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask
- Flask-CORS

### AI
- Google Gemini API
- `google-genai`

### Web Scraping
- Requests
- Trafilatura

### Document Generation
- Python-docx

### Development Tools
- VS Code
- Git
- GitHub

---

## ⚙️ How It Works

```text
Article URL
     ↓
Web Scraping
     ↓
Article Content Extraction
     ↓
Gemini AI Processing
     ↓
 ┌───────────────┬───────────────┬────────────────┐
 ↓               ↓               ↓
Twitter/X      LinkedIn       Instagram
 Thread          Post           Caption
 └───────────────┴───────────────┴────────────────┘
                     ↓
             Copy / Download
                     ↓
              Word Document