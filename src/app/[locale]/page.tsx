'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import { useTranslations } from 'next-intl';

type LinkProject = { type: 'link'; key: string; href: string };
type ModalProject = {
  type: 'modal';
  key: string;
  github: string;
  techStack: string[];
  hasGames?: boolean;
  codeSnippets?: Array<{ title: string; code: string }>;
};
type Project = LinkProject | ModalProject;

const projects: Project[] = [
  {
    type: 'modal',
    key: 'chatProject',
    github: 'https://github.com/dahiiv2/Chat-Project',
    techStack: ['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Prisma', 'Clerk', 'UploadThing', 'LiveKit'],
  },
  {
    type: 'modal',
    key: 'jumpCat',
    github: 'https://github.com/dahiiv2/JumpCat',
    techStack: ['Java 21', 'Paper API 1.21', 'Kyori Adventure', 'MiniMessage', 'Gradle (Kotlin DSL)', 'YAML'],
    hasGames: true,
    codeSnippets: [
      {
        title: 'Arena boundary detection & team elimination — BattleBoxRuntime.java',
        code: `public boolean inArena(Location loc) {
    double minX = Math.min(arena.pos1.getX(), arena.pos2.getX());
    double maxX = Math.max(arena.pos1.getX(), arena.pos2.getX());
    double minZ = Math.min(arena.pos1.getZ(), arena.pos2.getZ());
    double maxZ = Math.max(arena.pos1.getZ(), arena.pos2.getZ());
    // Y bounds ignored — avoids false negatives above floor level
    return x >= minX && x <= maxX && z >= minZ && z <= maxZ;
}

public boolean teamEliminated(char team) {
    for (Map.Entry<UUID, Character> e : side.entrySet()) {
        if (e.getValue() == team && alive.contains(e.getKey())) return false;
    }
    return true;
}`,
      },
      {
        title: 'Paginated leaderboard GUI with player heads — LeaderboardCommand.java',
        code: `public void openPage(Player p, int page) {
    List<Map.Entry<UUID,Integer>> rows =
        new ArrayList<>(plugin.getPointsService().top(1000).entrySet());
    int perPage = 45;
    int totalPages = Math.max(1, (int) Math.ceil(rows.size() / (double) perPage));
    int start = (page - 1) * perPage;
    int end   = Math.min(start + perPage, rows.size());
    Inventory inv = Bukkit.createInventory(null, 54,
        "Leaderboard (Page " + page + "/" + totalPages + ")");
    for (int i = start, slot = 0; i < end; i++, slot++) {
        ItemStack head = new ItemStack(Material.PLAYER_HEAD);
        SkullMeta meta = (SkullMeta) head.getItemMeta();
        meta.setOwningPlayer(Bukkit.getOfflinePlayer(rows.get(i).getKey()));
        head.setItemMeta(meta);
        inv.setItem(slot, head);
    }
    p.openInventory(inv);
}`,
      },
    ],
  },
];

export default function Home() {
  const tHome = useTranslations('HomePage');
  const tProj = useTranslations('Projects');
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-50 to-white text-stone-900">
      <main className="flex-grow w-full">

        {/* ── Hero ── */}
        <section className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24">
          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Photo — left on desktop, below text on mobile */}
            <motion.div
              className="relative order-2 md:order-1 rotate-[-1.5deg]"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' as const }}
            >
              {/* Ambient glow */}
              <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-amber-100 blur-3xl opacity-60 pointer-events-none -z-10" />

              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-stone-900/10">
                <Image src="/photo.PNG" alt="Daniel Mellera" fill className="object-cover" priority />
              </div>
            </motion.div>

            {/* Text — right on desktop, top on mobile */}
            <div className="order-1 md:order-2 flex flex-col">
              <motion.p
                className="text-[11px] uppercase tracking-[0.3em] text-amber-700 font-semibold mb-6 flex items-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.0, ease: 'easeOut' as const }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                Portfolio
              </motion.p>

              <h1 className="text-6xl sm:text-7xl font-black text-stone-900 leading-[1.0] tracking-tight">
                {tHome('title').split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    className="block"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.07 + i * 0.09, ease: 'easeOut' as const }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                className="mt-4 text-xs uppercase tracking-[0.22em] text-stone-400"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.22, ease: 'easeOut' as const }}
              >
                {tHome('role')}
              </motion.p>

              <motion.div
                className="mt-7 w-8 h-px bg-amber-700/50"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.28, ease: 'easeOut' as const }}
                style={{ transformOrigin: 'left' }}
              />

              <motion.p
                className="mt-6 text-stone-500 text-base leading-relaxed max-w-xs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.34, ease: 'easeOut' as const }}
              >
                {tHome('subtitle')}
              </motion.p>

              <motion.div
                className="mt-8 flex items-center gap-5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.42, ease: 'easeOut' as const }}
              >
                <a
                  href="https://github.com/dahiiv2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-colors duration-200"
                >
                  <FaGithub size={16} />
                  <span className="text-xs tracking-wide">GitHub</span>
                </a>
                <span className="w-px h-4 bg-stone-200" />
                <a
                  href="https://www.linkedin.com/in/daniel-mellera-29a037380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-colors duration-200"
                >
                  <FaLinkedin size={16} />
                  <span className="text-xs tracking-wide">LinkedIn</span>
                </a>
              </motion.div>
            </div>

          </div>
        </section>

        {/* ── Projects ── */}
        <section className="pb-28 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.p
              className="text-[11px] uppercase tracking-[0.3em] text-stone-400 font-semibold text-center mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' as const }}
            >
              {tHome('projectsTitle')}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div key={p.key}>
                  <ProjectCard
                    title={tProj(`${p.key}.title`)}
                    description={tProj(`${p.key}.shortDescription`)}
                    tag={tProj(`${p.key}.tag`)}
                    {...(p.type === 'link'
                      ? { href: p.href }
                      : { onClick: () => setOpenModal(p.key) })}
                  />
                  {p.type === 'modal' && (
                    <ProjectModal
                      isOpen={openModal === p.key}
                      onClose={() => setOpenModal(null)}
                      title={tProj(`${p.key}.title`)}
                      tag={tProj(`${p.key}.tag`)}
                      description={tProj(`${p.key}.description`)}
                      features={(tProj.raw(`${p.key}.features`) as string[]) ?? []}
                      games={p.hasGames ? (tProj.raw(`${p.key}.games`) as Array<{ name: string; description: string }>) : []}
                      techStack={p.techStack}
                      github={p.github}
                      codeSnippets={p.codeSnippets}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-stone-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-stone-400 text-sm">
          <span>{tHome('footerText', { year: new Date().getFullYear() })}</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/dahiiv2"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-700 transition-colors duration-200"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-mellera-29a037380"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-700 transition-colors duration-200"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
