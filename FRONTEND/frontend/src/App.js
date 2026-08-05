import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-title">VectorShift Pipeline Builder</span>
        </div>
      </header>
      <PipelineToolbar />
      <main className="app-canvas">
        <PipelineUI />
      </main>
      <SubmitButton />
    </div>
  );
}

export default App;
