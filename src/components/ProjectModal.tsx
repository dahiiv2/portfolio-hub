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
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl shadow-black/60 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, y: 20, scale: 0.97, transition: { duration: 0.2 } }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent rounded-t-2xl" />

            {/* Sticky header */}
            <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm px-6 py-4 flex items-start justify-between border-b border-gray-800">
              <div>
                <span className="uppercase tracking-wider text-xs text-amber-400 font-semibold">{tag}</span>
                <h2 className="text-2xl font-bold text-white mt-1">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors duration-200 p-1.5 rounded-lg hover:bg-gray-800 shrink-0 ml-4 mt-0.5 cursor-pointer"
                aria-label="Close"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <p className="text-gray-300 leading-relaxed">{description}</p>

              {games && games.length > 0 && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-3">
                    {t('gamesLabel')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {games.map((game) => (
                      <div
                        key={game.name}
                        className="bg-gray-800/60 rounded-lg p-3 border border-gray-700/60"
                      >
                        <p className="font-semibold text-white text-sm">{game.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{game.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h3 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-3">
                  {t('featuresLabel')}
                </h3>
                <ul className="space-y-1.5">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-amber-500 mt-[3px] shrink-0 text-[10px]">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-3">
                  {t('techStackLabel')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/50 text-amber-400 hover:text-amber-300 rounded-xl font-semibold transition-all duration-200"
              >
                <FaGithub size={18} />
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
