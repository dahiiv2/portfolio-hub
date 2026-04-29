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
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

const CardInner = ({
  tag,
  title,
  description,
  isLink,
}: Pick<ProjectCardProps, 'tag' | 'title' | 'description'> & { isLink: boolean }) => (
  <div className="bg-white border border-stone-200 rounded-2xl p-6 h-full flex flex-col transition-all duration-200 group-hover:border-stone-300 group-hover:shadow-md">
    <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-semibold">
      {tag}
    </p>
    <h3 className="mt-3 text-xl font-bold text-stone-900 leading-snug transition-colors duration-200 group-hover:text-stone-700">
      {title}
    </h3>
    <p className="mt-2 text-stone-500 text-sm leading-relaxed flex-grow">
      {description}
    </p>
    <div className="mt-5 flex justify-end">
      <span className="text-stone-300 group-hover:text-amber-700 transition-all duration-200 group-hover:translate-x-0.5">
        {isLink ? <FaExternalLinkAlt size={12} /> : <FaArrowRight size={12} />}
      </span>
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
