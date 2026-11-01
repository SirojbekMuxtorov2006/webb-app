import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AIAssistantDrawer } from '../components/ai/AIAssistantDrawer';

export const metadata: Metadata = {
  title: 'Uzum AI Marketplace — O\'zbekistondagi AI integratsiyalangan internet-bozor',
  description: 'Elektronika, smartfonlar, maishiy texnika va kiyim-kechaklar eng yaxshi narxlarda. 1 kunda bepul yetkazib berish va Uzum Nasiya 0-0-12.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className="min-h-screen flex flex-col justify-between">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
          {children}
        </main>
        <AIAssistantDrawer />
        <Footer />
      </body>
    </html>
  );
}
