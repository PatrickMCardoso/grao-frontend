import { SiteHeader } from '@/components/site-header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader variant="logout" />
      <main className="container mx-auto max-w-xl px-4">{children}</main>
    </>
  );
}
