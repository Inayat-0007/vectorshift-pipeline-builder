// submit.js
// Sends the pipeline graph (nodes + edges) to the backend for DAG analysis.

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const data = await response.json();
            const dagStatus = data.is_dag
                ? '✅ Valid DAG — No cycles detected'
                : '❌ Cycle Detected — Not a valid DAG';

            alert(
                `Pipeline Analysis\n` +
                `━━━━━━━━━━━━━━━━━━\n` +
                `Nodes: ${data.num_nodes}\n` +
                `Edges: ${data.num_edges}\n` +
                `Status: ${dagStatus}`
            );
        } catch (error) {
            alert(`Error submitting pipeline:\n${error.message}`);
        }
    };

    return (
        <div className="submit-container">
            <button className="submit-button" type="button" onClick={handleSubmit}>
                Submit Pipeline
            </button>
        </div>
    );
};
