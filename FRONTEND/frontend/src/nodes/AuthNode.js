// AuthNode.js
// API authentication proxy node for token/header injection.

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const AuthNode = ({ id, data, selected }) => {
  const [authType, setAuthType] = useState(data?.authType || 'Bearer');
  const [token, setToken] = useState(data?.token || '');
  const [headerKey, setHeaderKey] = useState(data?.headerKey || 'Authorization');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'authType', authType);
  }, [authType, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, 'token', token);
  }, [token, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, 'headerKey', headerKey);
  }, [headerKey, id, updateNodeField]);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-request` },
    { type: 'source', position: Position.Right, id: `${id}-authenticated` },
  ];

  return (
    <BaseNode id={id} label="Auth" icon="🔐" handles={handles} selected={selected}>
      <label className="node-field">
        <span>Type</span>
        <select value={authType} onChange={(e) => setAuthType(e.target.value)}>
          <option value="Bearer">Bearer Token</option>
          <option value="API-Key">API Key</option>
          <option value="Basic">Basic Auth</option>
          <option value="Custom">Custom Header</option>
        </select>
      </label>
      <label className="node-field">
        <span>Header</span>
        <input
          type="text"
          value={headerKey}
          onChange={(e) => setHeaderKey(e.target.value)}
          placeholder="Authorization"
        />
      </label>
      <label className="node-field">
        <span>Token</span>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="••••••••"
        />
      </label>
    </BaseNode>
  );
};
