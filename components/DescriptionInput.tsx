import React from 'react';
import { Tone, TONES } from '../types';

interface DescriptionInputProps {
  originalDescription: string;
  setOriginalDescription: (value: string) => void;
  keywords: string;
  setKeywords: (value: string) => void;
  tone: Tone;
  setTone: (value: Tone) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const MagicWandIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L13.5 3.08579L14.2071 2.37868C14.5976 1.98816 15.2308 1.98816 15.6213 2.37868L16.5 3.25736L17.2071 2.55025C17.5976 2.15973 18.2308 2.15973 18.6213 2.55025L20.9497 4.87868C21.3403 5.2692 21.3403 5.90237 20.9497 6.29289L11.9142 15.3284C11.5237 15.719 10.8905 15.719 10.5 15.3284L2.29289 7.12132C1.90237 6.7308 1.90237 6.09763 2.29289 5.70711L4.62132 3.37868C5.01184 2.98816 5.64501 2.98816 6.03553 3.37868L6.74264 4.08579L7.5 3.32843L8.20711 2.62132C8.59763 2.2308 9.2308 2.2308 9.62132 2.62132L10.5 3.5L11.2929 2.29289ZM9.56066 5.5L7.5 7.56066L10.5 10.5607L12.5607 8.5L9.56066 5.5ZM5.5 14.5858L3.41421 16.6716C3.02369 17.0621 3.02369 17.6953 3.41421 18.0858L5.91421 20.5858C6.30474 20.9763 6.9379 20.9763 7.32843 20.5858L9.41421 18.5L5.5 14.5858Z"/>
    </svg>
);


export const DescriptionInput: React.FC<DescriptionInputProps> = ({
  originalDescription,
  setOriginalDescription,
  keywords,
  setKeywords,
  tone,
  setTone,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <label htmlFor="description" className="block text-sm font-bold text-charcoal mb-2">
          1. Your Product Details
        </label>
        <textarea
          id="description"
          rows={10}
          className="w-full p-3 bg-cream/60 border border-medium-gray rounded-xl shadow-inner focus:ring-2 focus:ring-mango focus:border-mango transition-all"
          placeholder="e.g., A handmade wallet made from 100% genuine leather. It has 6 card slots and a roomy cash pocket..."
          value={originalDescription}
          onChange={(e) => setOriginalDescription(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="keywords" className="block text-sm font-bold text-charcoal mb-2">
          2. SEO Keywords (Optional)
        </label>
        <input
          type="text"
          id="keywords"
          className="w-full p-3 bg-cream/60 border border-medium-gray rounded-xl shadow-inner focus:ring-2 focus:ring-mango focus:border-mango transition-all"
          placeholder="e.g., minimalist wallet, gift for him, full grain"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-charcoal mb-3">
          3. Tone of Voice
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TONES.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`px-3 py-2 text-sm font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mango ${
                tone === t
                  ? 'bg-mango text-white shadow-sm'
                  : 'bg-light-gray text-charcoal/80 hover:bg-medium-gray/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !originalDescription}
        className="w-full flex items-center justify-center gap-2 bg-mango hover:bg-mango-dark text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Beautifying...
          </>
        ) : (
          <>
            <MagicWandIcon className="h-5 w-5" />
            Beautify Description
          </>
        )}
      </button>
    </div>
  );
};