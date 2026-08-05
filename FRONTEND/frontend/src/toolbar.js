// toolbar.js
// Node palette toolbar — all 9 draggable node types grouped by category.

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar">
            <div className="toolbar-section">
                <span className="toolbar-section-title">I/O</span>
                <div className="toolbar-nodes">
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='customOutput' label='Output' />
                </div>
            </div>
            <div className="toolbar-section">
                <span className="toolbar-section-title">Processing</span>
                <div className="toolbar-nodes">
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='text' label='Text' />
                    <DraggableNode type='transform' label='Transform' />
                    <DraggableNode type='filter' label='Filter' />
                </div>
            </div>
            <div className="toolbar-section">
                <span className="toolbar-section-title">Logic</span>
                <div className="toolbar-nodes">
                    <DraggableNode type='condition' label='Condition' />
                </div>
            </div>
            <div className="toolbar-section">
                <span className="toolbar-section-title">Integration</span>
                <div className="toolbar-nodes">
                    <DraggableNode type='database' label='Database' />
                    <DraggableNode type='auth' label='Auth' />
                </div>
            </div>
        </div>
    );
};
