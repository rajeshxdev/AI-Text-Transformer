// ============================================================
// App.jsx - Root component, manages all shared state & logic
// ============================================================

import React, { useState, useMemo } from "react";
import TextInput from "./components/TextInput";
import ActionButtons from "./components/ActionButtons";
import OutputBox from "./components/OutputBox";
import {
  sendToGemini,
  buildSummarizePrompt,
  buildGrammarPrompt,
  buildProfessionalPrompt,
  buildCasualPrompt,
} from "./services/geminiApi";
import "./App.css";

function App() {
  // ── State Variables ──────────────────────────────────────
  // inputText: what the user typed in the textarea
  const [inputText, setInputText] = useState("");

  // outputText: the AI-transformed result
  const [outputText, setOutputText] = useState("");

  // isLoading: true while waiting for Gemini API response
  const [isLoading, setIsLoading] = useState(false);

  // error: holds error message string, or null if no error
  const [error, setError] = useState(null);

  // activeAction: tracks which button was last clicked
  // Used to highlight the active button and label the output
  const [activeAction, setActiveAction] = useState(null);

  // ── Derived Values (useMemo caches these calculations) ───
  // Only recalculates when inputText changes
  const wordCount = useMemo(() => {
    const trimmed = inputText.trim();
    if (!trimmed) return 0;
    // Split on one or more whitespace characters
    return trimmed.split(/\s+/).length;
  }, [inputText]);

  const charCount = useMemo(() => {
    return inputText.length;
  }, [inputText]);

  // ── Main Handler: Transform Text ─────────────────────────
  // Called when user clicks any of the transform buttons
  const handleTransform = async (actionType) => {
    // Guard: Don't proceed if input is empty
    if (!inputText.trim()) return;

    // Set loading state and clear previous results/errors
    setIsLoading(true);
    setError(null);
    setOutputText("");
    setActiveAction(actionType);

    try {
      // Build the appropriate prompt based on which button was clicked
      let prompt;
      switch (actionType) {
        case "summarize":
          prompt = buildSummarizePrompt(inputText);
          break;
        case "grammar":
          prompt = buildGrammarPrompt(inputText);
          break;
        case "professional":
          prompt = buildProfessionalPrompt(inputText);
          break;
        case "casual":
          prompt = buildCasualPrompt(inputText);
          break;
        default:
          throw new Error("Unknown action type");
      }

      // Send the prompt to Gemini and wait for the response
      const result = await sendToGemini(prompt);

      // Success: update the output text
      setOutputText(result);
    } catch (err) {
      // Something went wrong — show the error message
      console.error("Transform error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      // Always turn off loading, whether success or error
      setIsLoading(false);
    }
  };

  // ── Clear Handler ────────────────────────────────────────
  // Resets everything back to the initial empty state
  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setError(null);
    setActiveAction(null);
  };

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="app">
      {/* ── App Header ── */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">AI-Text-Transformer</span>
          </div>
          <p className="tagline">Transform any text with AI — instantly</p>
        </div>
        {/* Decorative blobs for visual depth */}
        <div className="header-blob header-blob-1" aria-hidden="true"></div>
        <div className="header-blob header-blob-2" aria-hidden="true"></div>
      </header>

      {/* ── Main Content ── */}
      <main className="app-main">

        {/* Two-panel layout: Input | Output */}
        <div className="panels-container">

          {/* Left Panel: Text Input */}
          <TextInput
            inputText={inputText}
            setInputText={setInputText}
            wordCount={wordCount}
            charCount={charCount}
          />

          {/* Right Panel: Output */}
          <OutputBox
            outputText={outputText}
            isLoading={isLoading}
            error={error}
            activeAction={activeAction}
          />
        </div>

        {/* Action Buttons — centered between panels */}
        <ActionButtons
          onTransform={handleTransform}
          onClear={handleClear}
          isLoading={isLoading}
          inputText={inputText}
          activeAction={activeAction}
        />
      </main>

      {/* ── Footer ── */}
      <footer className="app-footer">
        <p>
          Built with React.js + Gemini API &nbsp;·&nbsp;
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get your free API key →
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
