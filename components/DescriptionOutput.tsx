import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';

interface DescriptionOutputProps {
  description: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-4 bg-medium-gray rounded w-3/4"></div>
    <div className="h-4 bg-medium-gray rounded"></div>
    <div className="h-4 bg-medium-gray rounded w-5/6"></div>
    <div className="h-4 bg-medium-gray rounded w-1/2"></div>
  </div>
);

export const DescriptionOutput: React.FC<DescriptionOutputProps> = ({
  description,
  isLoading,
  error,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (description) {
      setIsCopied(false);
    }
  }, [description]);

  const handleCopy = () => {
    if (!description) return;
    navigator.clipboard.writeText(description);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const hasContent = !isLoading && !error && description;

  return (
    <div className="bg-light-gray border border-medium-gray/80 rounded-xl p-4 h-full flex flex-col relative min-h-[480px] lg:min-h-0">
        <div className="flex-grow overflow-auto pr-2 relative">
            <h2 className="text-lg font-bold text-charcoal mb-3">Your New Description ✨</h2>
            {isLoading && <LoadingSkeleton />}
            {error && <div className="text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}
            {!isLoading && !error && !description && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-charcoal/50 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-medium-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082a9.753 9.753 0 018.32 11.84c-1.604 4.032-5.91 6.353-10.083 5.344-4.172-1.009-6.95-4.834-6.346-9.112A9.753 9.753 0 019.75 3.104z" /></svg>
                    <p className="mt-4 text-sm font-semibold">Your shiny new description will appear here!</p>
                </div>
            )}
            {hasContent && (
                <div 
                    className="prose prose-slate max-w-none text-charcoal whitespace-pre-wrap" 
                    style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                >
                    {description}
                </div>
            )}
        </div>
        {hasContent && (
            <div className="pt-4 mt-auto">
                <button
                    onClick={handleCopy}
                    className="w-full flex items-center justify-center gap-2 bg-medium-gray/60 hover:bg-medium-gray text-charcoal font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    {isCopied ? <CheckIcon className="h-5 w-5 text-green-600" /> : <ClipboardIcon className="h-5 w-5" />}
                    {isCopied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
            </div>
        )}
    </div>
  );
};