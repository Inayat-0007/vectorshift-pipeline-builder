// TransformNode.js
// Applies a text transformation script to incoming data.

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TransformNode = ({ id, data, selected }) => {
  const [script, setScript] = useState(data?.script || 'return input.toUpperCase();');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'script', script);
  }, [script, id, updateNodeField]);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode id={id} label="Transform" icon="⚡" handles={handles} selected={selected}>
      <label className="node-field">
        <span>Script</span>
        <textarea
          className="node-textarea"
          value={script}
          onChange={(e) => setScript(e.target.value)}
          rows={3}
          placeholder="return input.toUpperCase();"
        />
      </label>
    </BaseNode>
  );
};
