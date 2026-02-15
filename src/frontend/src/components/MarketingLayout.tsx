import { ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import PageTransition from './PageTransition';

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1">{children}</main>
      </PageTransition>
      <SiteFooter />
    </div>
  );
}
