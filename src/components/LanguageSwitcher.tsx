'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const current = segments[0] === 'en' || segments[0] === 'es' ? segments[0] : 'en';
  const rest = segments.slice(1).join('/');

  const hrefFor = (locale: 'en' | 'es') => `/${locale}${rest ? '/' + rest : ''}`;

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-2 py-1 text-xs shadow-sm">
      <Link
        href={hrefFor('en')}
        className={`px-2.5 py-0.5 rounded-full font-medium transition-colors duration-150 ${
          current === 'en'
            ? 'bg-amber-700 text-white'
            : 'text-stone-500 hover:text-stone-900'
        }`}
      >
        EN
      </Link>
      <span className="text-stone-200">|</span>
      <Link
        href={hrefFor('es')}
        className={`px-2.5 py-0.5 rounded-full font-medium transition-colors duration-150 ${
          current === 'es'
            ? 'bg-amber-700 text-white'
            : 'text-stone-500 hover:text-stone-900'
        }`}
      >
        ES
      </Link>
    </div>
  );
}
