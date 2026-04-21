import React from 'react';
import HomepageNav from './components/HomepageNav';
import {
  HeroSection,
  WhatWeDoSection,
  WhatWeDoGrid,
  WhoItIsSection,
  ProofBlockSection,
  ClosingCTA,
  GlobalFooter
} from './components/HomepageSections';
import ProofBar from './components/ProofBar';

export default function Homepage() {
  React.useEffect(() => {
    const tick = () => { window.lucide && window.lucide.createIcons(); };
    tick();
    const t1 = setTimeout(tick, 200);
    const t2 = setTimeout(tick, 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <>
      <HomepageNav />
      <div style={{ paddingTop: 88 }}>
        <HeroSection />
        <ProofBar />
        <WhatWeDoGrid />
        <WhatWeDoSection />
        <WhoItIsSection />
        <ProofBlockSection />
        <ClosingCTA />
        <GlobalFooter />
      </div>
    </>
  );
}
