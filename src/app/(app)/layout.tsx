import { SiteHeader } from '@/components/site-header';

import { Providers } from '../providers';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <SiteHeader variant="logout" />
      <main className="container mx-auto max-w-xl">{children}</main>
    </Providers>
  );
}
