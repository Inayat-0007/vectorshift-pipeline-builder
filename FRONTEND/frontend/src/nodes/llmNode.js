// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data, selected }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system` },
    { type: 'target', position: Position.Left, id: `${id}-prompt` },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  return (
    <BaseNode id={id} label="LLM" icon="🤖" handles={handles} selected={selected}>
      <p className="node-description">This is a LLM.</p>
    </BaseNode>
  );
};
