// ============================================================
// TextInput.jsx - The left panel where users type their text
// ============================================================

import React from "react";

// Props this component receives from App.jsx:
// - inputText: the current text in the textarea (controlled input)
// - setInputText: function to update the text when user types
// - wordCount: number of words in the input
// - charCount: number of characters in the input
function TextInput({ inputText, setInputText, wordCount, charCount }) {
  // Handle textarea changes: update state with new value
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="panel input-panel">
      {/* Panel header */}
      <div className="panel-header">
        <div className="panel-title">
          <span className="panel-icon">✏️</span>
          <h2>Your Text</h2>
        </div>
        {/* Live word and character counts */}
        <div className="counts">
          <span className="count-badge">{wordCount} words</span>
          <span className="count-badge">{charCount} chars</span>
        </div>
      </div>

      {/* Main textarea for user input */}
      <textarea
        className="text-area"
        value={inputText}
        onChange={handleChange}
        placeholder="Paste or type your text here...

Examples:
• A paragraph you want to summarize
• An email draft to fix grammar
• A casual message to make professional"
        rows={12}
        aria-label="Input text area"
      />

      {/* Tip shown below textarea */}
      <p className="input-tip">
        💡 Tip: Works best with 20–500 words
      </p>
    </div>
  );
}

export default TextInput;
