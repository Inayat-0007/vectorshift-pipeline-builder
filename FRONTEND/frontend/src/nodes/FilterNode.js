// FilterNode.js
// Filters incoming data based on a selected condition rule.

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data, selected }) => {
  const [filterRule, setFilterRule] = useState(data?.filterRule || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'filterRule', filterRule);
  }, [filterRule, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, 'filterValue', filterValue);
  }, [filterValue, id, updateNodeField]);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-data` },
    { type: 'source', position: Position.Right, id: `${id}-filtered` },
  ];

  return (
    <BaseNode id={id} label="Filter" icon="🔍" handles={handles} selected={selected}>
      <label className="node-field">
        <span>Rule</span>
        <select value={filterRule} onChange={(e) => setFilterRule(e.target.value)}>
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
          <option value="regex">Regex Match</option>
        </select>
      </label>
      <label className="node-field">
        <span>Value</span>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Filter pattern..."
        />
      </label>
    </BaseNode>
  );
};
