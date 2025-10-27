import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal tracking-tight">
      Turn Words into <span className="text-mango">Magic</span>
    </h1>
    <p className="mt-4 text-lg text-charcoal/80 max-w-2xl mx-auto">
      Paste your product details and let our AI craft compelling copy that sells. Perfect for your e-commerce store!
    </p>
  </header>
);