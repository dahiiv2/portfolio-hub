'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';

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
  codeSnippets?: CodeSnippet[];
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
  codeSnippets,
}) => {
  const t = useTranslations('Modal');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
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

              {/* GitHub CTA */}
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
