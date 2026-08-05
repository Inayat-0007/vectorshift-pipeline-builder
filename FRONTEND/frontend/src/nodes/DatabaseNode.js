// DatabaseNode.js
// Vector database configuration node for collection search.

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const DatabaseNode = ({ id, data, selected }) => {
  const [collection, setCollection] = useState(data?.collection || 'documents');
  const [topK, setTopK] = useState(data?.topK || 5);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'collection', collection);
  }, [collection, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, 'topK', topK);
  }, [topK, id, updateNodeField]);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-query` },
    { type: 'source', position: Position.Right, id: `${id}-results` },
  ];

  return (
    <BaseNode id={id} label="Database" icon="🗄️" handles={handles} selected={selected}>
      <label className="node-field">
        <span>Collection</span>
        <input
          type="text"
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          placeholder="Collection name"
        />
      </label>
      <label className="node-field">
        <span>Top K</span>
        <input
          type="number"
          value={topK}
          min={1}
          max={100}
          onChange={(e) => setTopK(parseInt(e.target.value) || 1)}
        />
      </label>
    </BaseNode>
  );
};
