"use client";

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: 40, color: 'red', background: 'white', minHeight: '100vh' }}>
      <h2>FATAL ERROR CAUGHT</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
