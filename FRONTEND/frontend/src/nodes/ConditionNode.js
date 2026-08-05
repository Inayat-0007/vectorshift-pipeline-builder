// ConditionNode.js
// Evaluates a condition and routes to True or False output paths.

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const ConditionNode = ({ id, data, selected }) => {
  const [condition, setCondition] = useState(data?.condition || 'value == true');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'condition', condition);
  }, [condition, id, updateNodeField]);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-true` },
    { type: 'source', position: Position.Right, id: `${id}-false` },
  ];

  return (
    <BaseNode id={id} label="Condition" icon="🔀" handles={handles} selected={selected}>
      <label className="node-field">
        <span>Rule</span>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. value > 10"
        />
      </label>
      <div className="node-handle-labels">
        <span className="handle-label-right" style={{ top: '33%' }}>✅ True</span>
        <span className="handle-label-right" style={{ top: '66%' }}>❌ False</span>
      </div>
    </BaseNode>
  );
};
