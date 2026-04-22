import React from 'react';
import HomepageNav from './components/HomepageNav';
import {
  HeroSection,
  TickerBar,
  StatsSection,
  WhoItIsSection,
  WhatWeDoGrid,
  WhatWeDoSection,
  D8ViewSection,
  ProofBlockSection,
  ClosingCTA,
  GlobalFooter,
} from './components/HomepageSections';

export default function Homepage() {
  return (
    <>
      <HomepageNav />
      <HeroSection />
      <TickerBar />
      <StatsSection />
      <WhoItIsSection />
      <WhatWeDoGrid />
      <WhatWeDoSection />
      <D8ViewSection />
      <ProofBlockSection />
      <ClosingCTA />
      <GlobalFooter />
    </>
  );
}
