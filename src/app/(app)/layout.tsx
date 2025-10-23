import { ProtectedRoute } from '@/components/protected-route';
import { SiteHeader } from '@/components/site-header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <SiteHeader variant="logout" />
      <main className="container mx-auto max-w-xl px-4">{children}</main>
    </ProtectedRoute>
  );
}
