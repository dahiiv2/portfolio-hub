'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  // Expect pathname like '/en', '/es', or '/en/...' '/es/...'
  const segments = pathname.split('/').filter(Boolean);
  const current = segments[0] === 'en' || segments[0] === 'es' ? segments[0] : 'en';
  const rest = segments.slice(current === 'en' || current === 'es' ? 1 : 0).join('/');

  const hrefFor = (locale: 'en' | 'es') => `/${locale}${rest ? '/' + rest : ''}`;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/60 px-2 py-1 text-sm text-gray-300">
      <Link
        href={hrefFor('en')}
        className={`px-2 py-0.5 rounded-full transition-colors ${current === 'en' ? 'bg-amber-500 text-black' : 'hover:text-amber-300'}`}
      >
        EN
      </Link>
      <span className="opacity-40">|</span>
      <Link
        href={hrefFor('es')}
        className={`px-2 py-0.5 rounded-full transition-colors ${current === 'es' ? 'bg-amber-500 text-black' : 'hover:text-amber-300'}`}
      >
        ES
      </Link>
    </div>
  );
}
