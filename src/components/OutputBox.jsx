// ============================================================
// OutputBox.jsx - The right panel that shows AI output
// ============================================================

import React, { useState } from "react";

// Props from App.jsx:
// - outputText: the transformed text from Gemini
// - isLoading: true while API is processing
// - error: error message string (or null if no error)
// - activeAction: which transformation was applied (for the label)
function OutputBox({ outputText, isLoading, error, activeAction }) {
  // Local state to track if user just copied (for button feedback)
  const [copied, setCopied] = useState(false);

  // Handle the "Copy" button click
  const handleCopy = async () => {
    if (!outputText) return;

    try {
      // Use the Clipboard API to copy text
      await navigator.clipboard.writeText(outputText);
      setCopied(true); // Show "Copied!" feedback

      // Reset back to "Copy" after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback if clipboard API isn't available (older browsers)
      console.error("Copy failed:", err);
    }
  };

  // Map action IDs to friendly labels for the output header
  const actionLabels = {
    summarize: "Summary",
    grammar: "Grammar Fixed",
    professional: "Professional Version",
    casual: "Casual Version",
  };

  // Determine what to show in the output area
  const showPlaceholder = !outputText && !isLoading && !error;
  const outputLabel = activeAction ? actionLabels[activeAction] : "Output";

  return (
    <div className="panel output-panel">
      {/* Panel header */}
      <div className="panel-header">
        <div className="panel-title">
          <span className="panel-icon">✨</span>
          <h2>{outputLabel}</h2>
        </div>

        {/* Copy button — only shows when there's output text */}
        {outputText && !isLoading && (
          <button
            className={`btn-copy ${copied ? "btn-copied" : ""}`}
            onClick={handleCopy}
            aria-label="Copy output text to clipboard"
          >
            {copied ? "✓ Copied!" : "📋 Copy"}
          </button>
        )}
      </div>

      {/* Output content area */}
      <div className="output-area" aria-live="polite" aria-atomic="true">

        {/* Loading state */}
        {isLoading && (
          <div className="loading-state">
            <div className="loading-spinner" aria-hidden="true">
              <div className="spinner-ring"></div>
            </div>
            <p className="loading-text">AI is transforming your text...</p>
            <p className="loading-subtext">Usually takes 3–8 seconds</p>
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="error-state" role="alert">
            <span className="error-icon">⚠️</span>
            <div className="error-content">
              <p className="error-title">Something went wrong</p>
              <p className="error-message">{error}</p>
              <p className="error-hint">
                Check your API key in <code>src/services/geminiApi.js</code>
              </p>
            </div>
          </div>
        )}

        {/* Output text */}
        {outputText && !isLoading && !error && (
          <div className="output-text">
            {outputText}
          </div>
        )}

        {/* Placeholder when nothing has happened yet */}
        {showPlaceholder && (
          <div className="placeholder-state">
            <div className="placeholder-icon">🤖</div>
            <p className="placeholder-title">Ready to transform</p>
            <p className="placeholder-desc">
              Type or paste text on the left, then click a transformation button
            </p>
            <div className="placeholder-steps">
              <div className="step">
                <span className="step-num">1</span>
                <span>Enter your text</span>
              </div>
              <div className="step">
                <span className="step-num">2</span>
                <span>Pick a transformation</span>
              </div>
              <div className="step">
                <span className="step-num">3</span>
                <span>Copy the result</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputBox;
