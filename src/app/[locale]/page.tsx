'use client';

import { useState } from 'react';
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
  codeSnippets?: Array<{ title: string; code: string }>;
};
type Project = LinkProject | ModalProject;

const projects: Project[] = [
  {
    type: 'modal',
    key: 'jumpCat',
    github: 'https://github.com/dahiiv2/JumpCat',
    techStack: ['Java 21', 'Paper API 1.21', 'Kyori Adventure', 'MiniMessage', 'Gradle (Kotlin DSL)', 'YAML'],
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

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' },
  }),
};

export default function Home() {
  const tHome = useTranslations('HomePage');
  const tProj = useTranslations('Projects');
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-white text-stone-900">
      <main className="flex-grow w-full">
        <div className="max-w-2xl mx-auto px-6">

          {/* Hero */}
          <section className="pt-32 pb-20 text-center">
            <motion.p
              className="text-[11px] uppercase tracking-[0.3em] text-amber-700 font-semibold mb-8"
              initial="hidden" animate="visible" custom={0} variants={fadeUp}
            >
              Portfolio
            </motion.p>
            <motion.h1
              className="text-5xl sm:text-6xl font-bold text-stone-900 tracking-tight"
              initial="hidden" animate="visible" custom={1} variants={fadeUp}
            >
              {tHome('title')}
            </motion.h1>
            <motion.div
              className="mt-6 mx-auto w-8 h-px bg-amber-700/40"
              initial="hidden" animate="visible" custom={2} variants={fadeUp}
            />
            <motion.p
              className="mt-5 text-stone-500 text-base sm:text-lg max-w-sm mx-auto leading-relaxed"
              initial="hidden" animate="visible" custom={3} variants={fadeUp}
            >
              {tHome('subtitle')}
            </motion.p>
          </section>

          {/* Projects */}
          <section className="pb-28">
            <motion.p
              className="text-[11px] uppercase tracking-[0.3em] text-stone-400 font-semibold text-center mb-10"
              initial="hidden" animate="visible" custom={4} variants={fadeUp}
            >
              {tHome('projectsTitle')}
            </motion.p>

            <div className="flex justify-center">
              {projects.map((p) => (
                <div key={p.key} className="w-full max-w-sm">
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
                      games={(tProj.raw(`${p.key}.games`) as Array<{ name: string; description: string }>) ?? []}
                      techStack={p.techStack}
                      github={p.github}
                      codeSnippets={p.codeSnippets}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <footer className="border-t border-stone-100 py-8">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between text-stone-400 text-sm">
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
