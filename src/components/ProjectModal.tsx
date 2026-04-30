'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface Game {
  name: string;
  description: string;
}

interface CodeSnippet {
  title: string;
  code: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tag: string;
  description: string;
  features: string[];
  games?: Game[];
  techStack: string[];
  github: string;
  liveUrl?: string;
  codeSnippets?: CodeSnippet[];
  screenshots?: string[];
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  title,
  tag,
  description,
  features,
  games,
  techStack,
  github,
  liveUrl,
  codeSnippets,
  screenshots,
}) => {
  const t = useTranslations('Modal');
  const [mounted, setMounted] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeScreenshot) setActiveScreenshot(null);
        else onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, activeScreenshot]);

  if (!mounted) return null;

  return createPortal(
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              className="relative bg-white border border-stone-200 rounded-2xl shadow-xl shadow-stone-900/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.18 } }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent rounded-t-2xl" />

              {/* Header */}
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm px-6 py-4 flex items-start justify-between border-b border-stone-100">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-semibold">
                    {tag}
                  </p>
                  <h2 className="text-2xl font-bold text-stone-900 mt-1">{title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-stone-400 hover:text-stone-700 transition-colors duration-150 p-1.5 rounded-lg hover:bg-stone-100 shrink-0 ml-4 mt-0.5 cursor-pointer"
                  aria-label="Close"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-7">

                {/* Description */}
                <p className="text-stone-600 leading-relaxed">{description}</p>

                {/* Screenshots */}
                {screenshots && screenshots.length > 0 && (
                  <section>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-semibold mb-3">
                      {t('screenshotsLabel')}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {screenshots.map((src) => (
                        <motion.button
                          key={src}
                          layoutId={`screenshot-${src}`}
                          onClick={() => setActiveScreenshot(src)}
                          className="relative aspect-video rounded-xl overflow-hidden border border-stone-200 cursor-zoom-in group"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Image src={src} alt="" fill className="object-cover" />
                          <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-200" />
                        </motion.button>
                      ))}
                    </div>
                  </section>
                )}

                {/* Minigames */}
                {games && games.length > 0 && (
                  <section>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-semibold mb-3">
                      {t('gamesLabel')}
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {games.map((game) => (
                        <div
                          key={game.name}
                          className="bg-stone-50 border border-stone-200 rounded-xl p-3.5"
                        >
                          <p className="font-semibold text-stone-800 text-sm">{game.name}</p>
                          <p className="text-stone-500 text-xs mt-0.5 leading-relaxed">{game.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Key Features */}
                <section>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-semibold mb-3">
                    {t('featuresLabel')}
                  </p>
                  <ul className="space-y-1.5">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-stone-600 text-sm">
                        <span className="text-amber-700 mt-[3px] shrink-0 text-[9px]">▸</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Code Highlights */}
                {codeSnippets && codeSnippets.length > 0 && (
                  <section>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-semibold mb-3">
                      {t('codeLabel')}
                    </p>
                    <div className="space-y-3">
                      {codeSnippets.map((snippet, i) => (
                        <div key={i}>
                          <p className="text-[11px] text-stone-400 font-mono mb-1.5">
                            {snippet.title}
                          </p>
                          <pre className="bg-stone-950 text-stone-300 text-[11px] leading-relaxed p-4 rounded-xl overflow-x-auto font-mono scrollbar-thin">
                            <code>{snippet.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Tech Stack */}
                <section>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-semibold mb-3">
                    {t('techStackLabel')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-stone-100 border border-stone-200 rounded-full text-xs text-stone-600 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                {/* CTAs */}
                <div className={`grid gap-3 ${liveUrl ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-700 text-white rounded-xl text-sm font-medium transition-all duration-200"
                    >
                      <FaExternalLinkAlt size={12} />
                      {t('liveDemo')}
                    </a>
                  )}
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-stone-200 hover:border-stone-300 text-stone-700 hover:text-stone-900 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-stone-50"
                  >
                    <FaGithub size={16} />
                    {t('viewOnGitHub')}
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {activeScreenshot && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveScreenshot(null)}
            />
            <motion.div
              layoutId={`screenshot-${activeScreenshot}`}
              className="relative max-w-[95vw] max-h-[90vh] rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src={activeScreenshot}
                alt=""
                width={1920}
                height={1080}
                className="object-contain max-h-[90vh] w-auto"
              />
            </motion.div>
            <button
              onClick={() => setActiveScreenshot(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FaTimes size={18} />
            </button>
          </div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
};

export default ProjectModal;
