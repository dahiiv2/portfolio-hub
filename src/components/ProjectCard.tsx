'use client';

import { motion } from 'framer-motion';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
  title: string;
  description: string;
  tag: string;
  href?: string;
  onClick?: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CardInner = ({
  tag,
  title,
  description,
  isLink,
}: Pick<ProjectCardProps, 'tag' | 'title' | 'description'> & { isLink: boolean }) => (
  <div className="bg-gray-800/50 rounded-xl shadow-lg overflow-hidden border border-gray-700 h-full transition-all duration-300 group-hover:border-amber-500 group-hover:shadow-[0_0_24px_rgba(245,158,11,0.08)] group-hover:-translate-y-1">
    <div className="p-6 flex flex-col h-full">
      <div className="uppercase tracking-wide text-xs text-amber-400 font-semibold">{tag}</div>
      <h3 className="mt-2 text-xl leading-tight font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
        {title}
      </h3>
      <p className="mt-2 text-gray-400 flex-grow text-sm leading-relaxed">{description}</p>
      <div className="mt-4 flex justify-end">
        <span className="text-amber-500/30 group-hover:text-amber-400 transition-all duration-300 group-hover:translate-x-0.5">
          {isLink ? <FaExternalLinkAlt size={13} /> : <FaArrowRight size={13} />}
        </span>
      </div>
    </div>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tag, href, onClick }) => {
  if (href) {
    return (
      <motion.div variants={cardVariants}>
        <a href={href} target="_blank" rel="noopener noreferrer" className="block group h-full">
          <CardInner tag={tag} title={title} description={description} isLink />
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div variants={cardVariants}>
      <button onClick={onClick} className="block group h-full w-full text-left cursor-pointer">
        <CardInner tag={tag} title={title} description={description} isLink={false} />
      </button>
    </motion.div>
  );
};

export default ProjectCard;
