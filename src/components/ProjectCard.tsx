'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  tag: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, href, tag }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div variants={cardVariants}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="block group h-full">
        <div className="bg-gray-800/50 rounded-xl shadow-lg overflow-hidden border border-gray-700 h-full transition-all duration-300 group-hover:border-amber-500 group-hover:shadow-amber-500/10 group-hover:-translate-y-1">
          <div className="p-6">
            <div className="uppercase tracking-wide text-sm text-amber-400 font-semibold">{tag}</div>
            <h3 className="block mt-2 text-xl leading-tight font-bold text-white group-hover:text-amber-300">{title}</h3>
            <p className="mt-2 text-gray-400">{description}</p>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default ProjectCard;
