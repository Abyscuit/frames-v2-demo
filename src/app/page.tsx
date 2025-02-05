'use client';

import dynamic from 'next/dynamic';

const Demo = dynamic(() => import('@/components/Demo'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col p-4'>
      <Demo />
    </main>
  );
}
