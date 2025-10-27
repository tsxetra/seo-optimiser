import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { DescriptionInput } from './components/DescriptionInput';
import { DescriptionOutput } from './components/DescriptionOutput';
import { beautifyDescription } from './services/geminiService';
import { Tone, TONES } from './types';

const App: React.FC = () => {
  const [originalDescription, setOriginalDescription] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [tone, setTone] = useState<Tone>(TONES[0]);
  const [beautifiedDescription, setBeautifiedDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!originalDescription.trim()) {
      setError('Please enter a product description.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setBeautifiedDescription('');

    try {
      const result = await beautifyDescription(originalDescription, tone, keywords);
      setBeautifiedDescription(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(`Failed to generate description: ${errorMessage}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [originalDescription, tone, keywords]);

  return (
    <div className="min-h-screen bg-cream font-sans antialiased text-charcoal">
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <Header />
          <div className="mt-10 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-medium-gray/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <DescriptionInput
                originalDescription={originalDescription}
                setOriginalDescription={setOriginalDescription}
                keywords={keywords}
                setKeywords={setKeywords}
                tone={tone}
                setTone={setTone}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
              <DescriptionOutput
                description={beautifiedDescription}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
          <footer className="text-center mt-10 text-charcoal/60 text-sm">
            <p>Crafted for creators, by your AI design partner.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;