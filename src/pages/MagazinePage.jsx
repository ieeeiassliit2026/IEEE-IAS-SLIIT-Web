import React, { useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { BookOpen, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import MagazineCover from '../assets/magazine/cover.webp';
import MagazinePdf from '../assets/magazine/magazine.pdf';
import flipSound from '../assets/magazine/flip.mp3';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function Page({ image, pageNumber }, ref) {
  return (
    <div ref={ref} className="bg-white flex items-center justify-center overflow-hidden">
      {image ? (
        <img src={image} alt={`Page ${pageNumber}`} className="w-full h-full object-contain" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-300">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
}
const FlipPage = React.forwardRef(Page);

export default function MagazinePage() {
  const [opened, setOpened] = useState(false);
  const [pageImages, setPageImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bookRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(flipSound);
  }, []);

  const handleOpen = async () => {
    setOpened(true);
    if (pageImages.length > 0) return;
    setLoading(true);
    try {
      const pdf = await pdfjsLib.getDocument(MagazinePdf).promise;
      const images = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        images.push(canvas.toDataURL('image/jpeg', 0.85));
      }
      setPageImages(images);
    } catch (err) {
      console.error('Failed to load magazine PDF', err);
    } finally {
      setLoading(false);
    }
  };

  const playFlip = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-16">
      {!opened ? (
        <button onClick={handleOpen} className="group flex flex-col items-center gap-6 cursor-pointer fade-in-snap">
          <div className="relative w-56 sm:w-64 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
            <img src={MagazineCover} alt="IAS Magazine" className="w-full h-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-black/10" />
          </div>
          <span className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-white text-sm font-semibold">
            <BookOpen size={16} /> Pick Up the Magazine
          </span>
        </button>
      ) : loading ? (
        <div className="flex flex-col items-center gap-3 fade-in-snap">
          <Loader2 className="animate-spin" size={28} style={{ color: 'var(--ias-green)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Opening the magazine...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 fade-in-snap w-full">
          <HTMLFlipBook
            ref={bookRef}
            width={340}
            height={460}
            size="stretch"
            minWidth={280}
            maxWidth={480}
            minHeight={380}
            maxHeight={640}
            showCover={true}
            onFlip={playFlip}
            className="mx-auto shadow-2xl"
          >
            {pageImages.map((img, i) => (
              <FlipPage key={i} image={img} pageNumber={i + 1} />
            ))}
          </HTMLFlipBook>

          <div className="flex items-center gap-4">
            <button
              onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
              className="p-3 rounded-full border cursor-pointer"
              style={{ borderColor: 'var(--border)' }}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <a href={MagazinePdf} target="_blank" rel="noreferrer" className="text-xs font-mono uppercase tracking-wide link-underline" style={{ color: 'var(--ias-green)' }}>
              Download PDF
            </a>
            <button
              onClick={() => bookRef.current?.pageFlip()?.flipNext()}
              className="p-3 rounded-full border cursor-pointer"
              style={{ borderColor: 'var(--border)' }}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
