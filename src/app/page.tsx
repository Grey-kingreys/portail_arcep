import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import StatsSection from '@/components/StatsSection'
import QuickActionsSection from '@/components/QuickActionsSection'
import ProfileAccessSection from '@/components/ProfileAccessSection'
import FloatingChat from '@/components/FloatingChat'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <QuickActionsSection />
      <ProfileAccessSection />
      <FloatingChat />
    </main>
  )
}