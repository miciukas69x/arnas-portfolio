"use client";

import { useEffect, useRef, useState } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize - ensure it happens after mount
    const initResize = () => {
      resize();
      setIsReady(true);
    };
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      initResize();
    });
    
    // Throttle resize
    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        // Re-render after resize
        if (isReady) {
          requestAnimationFrame(() => render());
        }
      }, 100);
    };
    window.addEventListener('resize', throttledResize, { passive: true });

    // Noise functions
    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (t: number, a: number, b: number) => a + t * (b - a);
    const grad = (hash: number, x: number, y: number, z: number) => {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };

    const permutation = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
    const p = new Array(512);
    for (let i = 0; i < 256; i++) {
      p[i] = permutation[i];
      p[256 + i] = permutation[i];
    }

    const noise = (x: number, y: number, z: number): number => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;
      
      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);
      
      const u = fade(x);
      const v = fade(y);
      const w = fade(z);
      
      const a = p[X] + Y;
      const aa = p[a] + Z;
      const ab = p[a + 1] + Z;
      const b = p[X + 1] + Y;
      const ba = p[b] + Z;
      const bb = p[b + 1] + Z;
      
      return lerp(w, 
        lerp(v, 
          lerp(u, grad(p[aa], x, y, z), grad(p[ba], x - 1, y, z)),
          lerp(u, grad(p[ab], x, y - 1, z), grad(p[bb], x - 1, y - 1, z))
        ),
        lerp(v,
          lerp(u, grad(p[aa + 1], x, y, z - 1), grad(p[ba + 1], x - 1, y, z - 1)),
          lerp(u, grad(p[ab + 1], x, y - 1, z - 1), grad(p[bb + 1], x - 1, y - 1, z - 1))
        )
      );
    };

    // Render static background (no animation)
    const render = () => {
      if (!canvas || !ctx) return;
      
      try {
        // Ensure canvas has valid dimensions
        if (canvas.width === 0 || canvas.height === 0) {
          canvas.width = window.innerWidth || 1920;
          canvas.height = window.innerHeight || 1080;
        }

        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;

        const scale = 0.002;
        const step = 2;

        for (let y = 0; y < canvas.height; y += step) {
          for (let x = 0; x < canvas.width; x += step) {
            let value = 0;
            let amplitude = 1;
            let frequency = 1;

            // Single octave for static look
            for (let o = 0; o < 2; o++) {
              value += noise(
                x * scale * frequency,
                y * scale * frequency,
                0 // Static - no time component
              ) * amplitude;
              amplitude *= 0.5;
              frequency *= 2;
            }

            value = (value + 1) * 0.5;
            value = Math.pow(value, 1.5);

            const brightness = Math.floor(value * 40);
            
            // Fill step x step block
            for (let dy = 0; dy < step && y + dy < canvas.height; dy++) {
              for (let dx = 0; dx < step && x + dx < canvas.width; dx++) {
                const i = ((y + dy) * canvas.width + (x + dx)) * 4;
                data[i] = brightness;
                data[i + 1] = brightness;
                data[i + 2] = brightness + 5;
                data[i + 3] = 255;
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
      } catch (error) {
        console.error('Error rendering background:', error);
        // Fallback: fill with solid color
        if (ctx && canvas) {
          ctx.fillStyle = 'hsl(0, 0%, 5%)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    };

    // Render after initialization
    if (isReady) {
      requestAnimationFrame(() => render());
    }

    return () => {
      window.removeEventListener('resize', throttledResize);
      clearTimeout(resizeTimeout);
    };
  }, [isReady]);

  return (
    <>
      {/* Fallback background - always visible */}
      <div 
        className="fixed inset-0 -z-10 bg-background"
        style={{ 
          backgroundColor: 'hsl(0, 0%, 5%)',
        }}
      />
      {/* Canvas overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 opacity-60"
        style={{ 
          backgroundColor: 'hsl(0, 0%, 5%)',
          display: isReady ? 'block' : 'none',
        }}
      />
    </>
  );
}
