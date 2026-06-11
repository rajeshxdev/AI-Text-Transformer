# ⚡ AI Text Transformer

A beginner-friendly React.js application that transforms your text using Google's **Gemini AI**.  
Built as a portfolio project to demonstrate React fundamentals, API integration, and responsive UI design.

![AI-Text-Transformer Preview](https://via.placeholder.com/800x400/7c3aed/ffffff?text=AI+Text+Transformer)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📝 Summarize | Condenses long text into key points |
| ✅ Fix Grammar | Corrects spelling, grammar, and punctuation |
| 💼 Professional | Rewrites text in a formal business tone |
| 😊 Casual | Rewrites text in a friendly, conversational tone |
| 🔢 Word & Char Count | Live count updates as you type |
| ⏳ Loading Spinner | Visual feedback during API calls |
| ⚠️ Error Handling | Clear error messages with fix hints |
| 📋 Copy Output | One-click copy to clipboard |
| 📱 Responsive | Works on mobile, tablet, and desktop |

---

## 🗂️ Project Structure

```
ai-text-transformer/
├── src/
│   ├── components/
│   │   ├── TextInput.jsx      # Left panel — user types here
│   │   ├── OutputBox.jsx      # Right panel — AI result shown here
│   │   └── ActionButtons.jsx  # Transform buttons in the middle
│   ├── services/
│   │   └── geminiApi.js       # All Gemini API logic lives here
│   ├── App.jsx                # Root component — manages state
│   ├── App.css                # All styling
│   └── main.jsx               # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Step 1 — Get a Gemini API Key (FREE)

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key (starts with `AIza...`)

> The free tier gives you **15 requests/minute** and **1 million tokens/day** — plenty for development!

---

### Step 2 — Add Your API Key

Open `src/services/geminiApi.js` and replace the placeholder:

```js
// Line 6 in geminiApi.js
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";
//                      ↑ Paste your key here
```

**Example:**
```js
const GEMINI_API_KEY = "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
```

> ⚠️ **Security Note:** Never commit your API key to GitHub!  
> For production, use environment variables (see below).

---

### Step 3 — Install & Run

```bash
# Navigate to project folder
cd ai-text-transformer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at **http://localhost:5173** 🎉

---

## 🌐 Deploying to Vercel (Free Hosting)

### Option A — Deploy via GitHub (Recommended)

**1. Push your code to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: AI Text Transformer"
git remote add origin https://github.com/YOUR_USERNAME/ai-text-transformer.git
git push -u origin main
```

> ⚠️ Before pushing: make sure you did NOT hardcode your API key. Use an environment variable instead (see below).

**2. Set up Environment Variable:**

In `src/services/geminiApi.js`, change:
```js
// FROM:
const GEMINI_API_KEY = "AIzaSy...";

// TO:
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
```

**3. Deploy on Vercel:**
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"New Project"** → Import your GitHub repo
3. In **"Environment Variables"**, add:
   - Name: `VITE_GEMINI_API_KEY`
   - Value: `AIzaSy...` (your actual key)
4. Click **"Deploy"**

Your app will be live at `https://your-project-name.vercel.app` ✅

---

### Option B — Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Build the project first
npm run build

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up project? → Y
# - Which scope? → Your account
# - Link to existing project? → N
# - Project name? → ai-text-transformer
# - Build command: npm run build
# - Output directory: dist
```

---

## 🔧 Using Environment Variables Locally

Create a `.env.local` file in the project root:

```env
VITE_GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

This file is already in `.gitignore`, so it won't be committed.

Then update `geminiApi.js`:
```js
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
```

---

## 🧠 How It Works — Beginner Explanation

```
User types text
      ↓
User clicks "Summarize"
      ↓
App.jsx calls handleTransform("summarize")
      ↓
buildSummarizePrompt(text) creates the instruction string
      ↓
sendToGemini(prompt) sends a POST request to Gemini API
      ↓
Gemini processes and returns transformed text
      ↓
App.jsx stores result in outputText state
      ↓
OutputBox.jsx re-renders and displays the result
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Fetch API | HTTP requests to Gemini |
| CSS3 | Styling & animations |
| Gemini 1.5 Flash | AI text transformation |

---

## 📚 React Concepts Used

- `useState` — manages input, output, loading, error state
- `useMemo` — efficiently calculates word/char count
- `async/await` — handles asynchronous API calls
- Component props — passes data between parent/child components
- Conditional rendering — shows loading/error/output based on state
- Controlled inputs — textarea value tied to React state
- `aria-*` attributes — basic accessibility

---

## 🐛 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `API key not valid` | Wrong key | Double-check in geminiApi.js |
| `403 Forbidden` | Key has no permissions | Regenerate at AI Studio |
| `429 Too Many Requests` | Rate limit hit | Wait 60 seconds and retry |
| `Failed to fetch` | Network issue | Check internet connection |
| Blank output | Empty response | Try different/longer input text |

---

## 👨‍💻 Author

Built by **Rajesh** as a portfolio project.  
Part of the MERN Stack + AI API learning journey.

---

## 📄 License

MIT — free to use, modify, and share.
