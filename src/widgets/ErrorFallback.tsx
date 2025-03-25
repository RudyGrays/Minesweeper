import { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-800 rounded">
      <h3 translate="no">Что-то пошло не так:</h3>
      <pre className="text-sm">{error.message}</pre>
      <button
        translate="no"
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        Попробовать снова
      </button>
    </div>
  );
}
