"use client";

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface CalendlyWidgetProps {
  url: string;
  className?: string;
}

export default function CalendlyWidget({ url, className = '' }: CalendlyWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded || !widgetRef.current) return;

    // Initialize Calendly widget after script is loaded
    const initWidget = () => {
      if (typeof window !== 'undefined' && (window as any).Calendly && widgetRef.current) {
        try {
          // Clear any existing content first
          widgetRef.current.innerHTML = '';
          
          // Initialize the inline widget
          (window as any).Calendly.initInlineWidget({
            url: url,
            parentElement: widgetRef.current,
          });
        } catch (error) {
          console.error('Error initializing Calendly widget:', error);
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initWidget, 100);
    
    return () => clearTimeout(timer);
  }, [scriptLoaded, url]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          setScriptLoaded(true);
        }}
        onError={() => {
          console.error('Failed to load Calendly script');
        }}
      />
      {scriptLoaded ? (
        <div
          ref={widgetRef}
          className={className}
          style={{ minWidth: '320px', height: '700px', width: '100%' }}
        />
      ) : (
        <div 
          className={`${className} flex items-center justify-center`}
          style={{ minWidth: '320px', height: '700px', width: '100%' }}
        >
          <p className="text-muted-foreground">Loading calendar...</p>
        </div>
      )}
    </>
  );
}

