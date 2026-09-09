# 🤖 AI Content Repurposer

> Transform one article into ready-to-use social media content with AI.

**AI Content Repurposer** is a full-stack AI-powered web application that takes an article URL, extracts its content, and automatically generates platform-specific content for **Twitter/X, LinkedIn, and Instagram**.

Users can instantly copy the generated content or download all outputs as a Word document.

---

## ✨ Project Preview

![AI Content Repurposer](screenshots/01-home.png)

---

## 🚀 Features

- 🔗 **Article URL Input** — Enter the URL of an accessible article.
- 🕷️ **Article Extraction** — Extract the main article content using Python.
- 🤖 **Gemini AI Generation** — Convert the extracted article into social-media content.
- 𝕏 **Twitter/X Thread** — Generate a concise 5-post thread.
- 💼 **LinkedIn Post** — Generate professional, engaging content.
- 📸 **Instagram Caption** — Generate an engaging caption with hashtags.
- 📋 **One-Click Copy** — Copy individual generated outputs instantly.
- 📄 **Word Export** — Download all generated content as a `.docx` document.
- 🌌 **Modern UI** — Responsive Midnight Aurora Glass interface.
- 🔐 **Secure API Key Handling** — API credentials are stored using environment variables.

---

## 📸 Screenshots

### 🏠 Home Page

The landing interface allows users to enter an article URL and start the repurposing process.

![Home Page](screenshots/01-home.png)

---

### ✨ Features & Workflow

The application presents its key capabilities and explains the simple three-step workflow.

![Features and Workflow](screenshots/02-features.png)

---

### 🤖 AI Processing

After submitting an article, the application extracts the content and sends it to Gemini AI for processing.

![AI Processing](screenshots/03-ai-processing.png)

---

### 📱 Generated Content

The application displays separate outputs for Twitter/X, LinkedIn, and Instagram, with options to copy or download the results.

![Generated Social Media Content](screenshots/04-generated-content.png)

---

## 🔄 How It Works

```text
        Article URL
             │
             ▼
     Python Web Scraping
             │
             ▼
    Article Content Extracted
             │
             ▼
        Gemini AI
             │
      ┌──────┼──────┐
      ▼      ▼      ▼
   Twitter  LinkedIn  Instagram
      │      │      │
      └──────┼──────┘
             ▼
       Copy / Download
             │
             ▼
       Word Document