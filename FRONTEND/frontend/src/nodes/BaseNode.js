// BaseNode.js
// Shared wrapper component for all pipeline nodes.
// Provides consistent styling, header, body layout, and dynamic Handle rendering.

import { Handle } from 'reactflow';

export const BaseNode = ({ id, label, icon, handles = [], children, selected }) => {
  return (
    <div className={`base-node ${selected ? 'selected' : ''}`}>
      {/* Node Header */}
      <div className="base-node-header">
        {icon && <span className="base-node-icon">{icon}</span>}
        <span className="base-node-title">{label}</span>
      </div>

      {/* Node Body */}
      <div className="base-node-body">
        {children}
      </div>

      {/* Dynamic Handles */}
      {handles.map((handle, idx) => {
        // For multiple handles on the same side, distribute them vertically
        const sameSide = handles.filter(h => h.position === handle.position);
        const sameIdx = sameSide.indexOf(handle);
        const offset = sameSide.length > 1
          ? `${((sameIdx + 1) / (sameSide.length + 1)) * 100}%`
          : '50%';

        return (
          <Handle
            key={handle.id}
            type={handle.type}
            position={handle.position}
            id={handle.id}
            style={{ top: offset, ...handle.style }}
            className="base-handle"
          />
        );
      })}
    </div>
  );
};
