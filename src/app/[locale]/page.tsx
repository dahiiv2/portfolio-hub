'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ProjectCard from '@/components/ProjectCard';
import { useTranslations } from 'next-intl';

const projects = [
  { key: 'chatApp', href: 'https://chat.dahii.es' },
  { key: 'pokemonDb', href: 'https://dahiipokemon.netlify.app/pokemons' },
] as const;

export default function Home() {
  const tHome = useTranslations('HomePage');
  const tProj = useTranslations('Projects');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  } as const;

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Glowing background effect */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-[-20%] left-[10%] w-[40rem] h-[40rem] bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[10%] w-[40rem] h-[40rem] bg-sky-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      <main className="relative z-10 flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section
          className="pt-16 pb-12 sm:pt-20 sm:pb-16 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-500"
            variants={itemVariants}
          >
            {tHome('title')}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 text-center"
            variants={itemVariants}
          >
            {tHome('subtitle')}
          </motion.p>
        </motion.section>

        <motion.section
          id="projects"
          className="py-12 sm:py-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 className="text-4xl sm:text-5xl font-bold text-center mb-16" variants={itemVariants}>
            {tHome('projectsTitle')}
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {projects.map((p) => (
              <ProjectCard
                key={p.key}
                title={tProj(`${p.key}.title`)}
                description={tProj(`${p.key}.description`)}
                tag={tProj(`${p.key}.tag`)}
                href={p.href}
              />
            ))}
          </div>
        </motion.section>
      </main>

      <footer className="relative z-10 bg-gray-900/50 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://github.com/dahiiv2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-mellera-29a037380"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
          <p>{tHome('footerText', { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
}