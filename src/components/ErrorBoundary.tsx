import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Collect/log the error
    this.setState({
      error,
      errorInfo
    });
    console.error("Uncaught error in Luigia Cake app:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.href = window.location.origin + window.location.pathname;
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-6 text-chocolate font-sans">
          <div className="max-w-xl w-full bg-white border border-outline/30 rounded-sm shadow-2xl p-8 md:p-12 text-center">
            
            <div className="w-16 h-16 rounded-full bg-gold/10 mx-auto flex items-center justify-center text-gold mb-6 animate-pulse">
              <AlertTriangle size={32} strokeWidth={1.5} />
            </div>

            <span className="text-[10px] uppercase tracking-widest font-bold text-gold/80 block mb-2">
              Qualcosa è andato storto
            </span>
            <h1 className="font-display text-3xl md:text-4xl text-chocolate-deep mb-4 leading-tight">
              Ops! Si è verificato un errore
            </h1>
            
            <p className="text-sm text-chocolate/70 leading-relaxed max-w-md mx-auto mb-8">
              Il sito ha riscontrato un'eccezione imprevista. Non ti preoccupare, puoi ricaricare la pagina o tornare alla bottega principale.
            </p>

            {/* Error Detail accordion/disclosure */}
            {this.state.error && (
              <div className="text-left bg-surface-low border border-outline/10 p-4 rounded-sm mb-8 text-xs font-mono max-h-40 overflow-y-auto overflow-x-hidden select-text text-chocolate/80">
                <p className="font-bold border-b border-outline/10 pb-1.5 mb-1.5 text-chocolate">
                  Errore: {this.state.error.message}
                </p>
                {this.state.error.stack && (
                  <pre className="whitespace-pre-wrap text-[10px] leading-relaxed opacity-80">
                    {this.state.error.stack}
                  </pre>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-4 bg-chocolate text-white text-xs font-bold uppercase tracking-widest hover:bg-gold transition-colors shadow-md flex items-center justify-center gap-2 rounded-sm"
              >
                <RotateCcw size={14} />
                Ricarica la pagina
              </button>
              <button
                onClick={() => {
                  window.location.hash = ''; // Clear route hashes if any
                  this.handleReset();
                }}
                className="px-6 py-4 border border-outline text-chocolate text-xs font-bold uppercase tracking-widest hover:border-chocolate transition-colors flex items-center justify-center gap-2 rounded-sm"
              >
                <Home size={14} />
                Torna alla Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
