// textNode.js
// Dynamic text node with auto-resizing textarea and variable handle parsing.
// Typing {{ variableName }} creates a target handle on the left for that variable.

import { useState, useEffect, useRef, useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

// Matches {{ validJSVariable }} patterns
const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Sync text back to Zustand store
  useEffect(() => {
    updateNodeField(id, 'text', currText);
  }, [currText, id, updateNodeField]);

  // Extract and deduplicate variables from {{ var }} patterns
  const variables = useMemo(() => {
    const matches = [];
    let match;
    while ((match = VARIABLE_REGEX.exec(currText)) !== null) {
      matches.push(match[1]);
    }
    return [...new Set(matches)];
  }, [currText]);

  // Auto-resize the textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(40, textarea.scrollHeight)}px`;
    }
  }, [currText]);

  // Build handles: dynamic left-side targets for variables + static right-side output
  const handles = useMemo(() => {
    const dynamicHandles = variables.map((varName) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${varName}`,
      style: {},
    }));
    const outputHandle = {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    };
    return [...dynamicHandles, outputHandle];
  }, [variables, id]);

  // Calculate dynamic width based on longest line
  const dynamicWidth = useMemo(() => {
    const lines = currText.split('\n');
    const maxLineLength = Math.max(...lines.map((l) => l.length), 15);
    return Math.min(Math.max(200, maxLineLength * 8.5 + 30), 500);
  }, [currText]);

  return (
    <BaseNode id={id} label="Text" icon="📝" handles={handles} selected={selected}>
      <div style={{ width: dynamicWidth }}>
        <textarea
          ref={textareaRef}
          className="node-textarea"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={1}
          style={{ width: '100%', resize: 'none' }}
        />
        {variables.length > 0 && (
          <div className="node-variables">
            {variables.map((v) => (
              <span key={v} className="variable-tag">{`{{${v}}}`}</span>
            ))}
          </div>
        )}
      </div>
    </BaseNode>
  );
};
