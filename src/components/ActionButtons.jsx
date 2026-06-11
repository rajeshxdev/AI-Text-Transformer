// ============================================================
// ActionButtons.jsx - The row of transform buttons in the middle
// ============================================================

import React from "react";

// Props from App.jsx:
// - onTransform: function to call when a transform button is clicked
// - onClear: function to clear all text
// - isLoading: true while API is processing (disables buttons)
// - inputText: needed to disable buttons when input is empty
// - activeAction: which button was last clicked (for styling)
function ActionButtons({ onTransform, onClear, isLoading, inputText, activeAction }) {
  // Define all transformation buttons in one array
  // Makes it easy to add new buttons later!
  const transformButtons = [
    {
      id: "summarize",
      label: "Summarize",
      icon: "📝",
      description: "Shorten to key points",
    },
    {
      id: "grammar",
      label: "Fix Grammar",
      icon: "✅",
      description: "Correct errors",
    },
    {
      id: "professional",
      label: "Professional",
      icon: "💼",
      description: "Formal tone",
    },
    {
      id: "casual",
      label: "Casual",
      icon: "😊",
      description: "Friendly tone",
    },
  ];

  // A button should be disabled when:
  // 1. The API is loading (prevents double-clicks)
  // 2. The input text is empty (nothing to transform)
  const isDisabled = isLoading || !inputText.trim();

  return (
    <div className="actions-panel">
      {/* Label above the buttons */}
      <p className="actions-label">Choose a transformation:</p>

      {/* Grid of transformation buttons */}
      <div className="transform-buttons">
        {transformButtons.map((btn) => (
          <button
            key={btn.id}
            className={`btn-transform ${activeAction === btn.id ? "btn-active" : ""} ${isLoading && activeAction === btn.id ? "btn-loading" : ""}`}
            onClick={() => onTransform(btn.id)}
            disabled={isDisabled}
            title={btn.description}
            aria-label={`${btn.label}: ${btn.description}`}
          >
            {/* Show spinner if this button is currently loading */}
            {isLoading && activeAction === btn.id ? (
              <span className="btn-spinner" aria-hidden="true"></span>
            ) : (
              <span className="btn-icon">{btn.icon}</span>
            )}
            <span className="btn-label">{btn.label}</span>
            <span className="btn-desc">{btn.description}</span>
          </button>
        ))}
      </div>

      {/* Clear button - separate from transform buttons */}
      <button
        className="btn-clear"
        onClick={onClear}
        disabled={isLoading}
        aria-label="Clear all text"
      >
        🗑️ Clear All
      </button>
    </div>
  );
}

export default ActionButtons;
