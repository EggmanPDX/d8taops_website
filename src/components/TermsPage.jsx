import React from 'react';
import HomepageNav from './HomepageNav';
import { GLOBAL_CSS, GlobalFooter } from './HomepageSections';

const NAVY  = '#081F5C';
const BLUE  = '#0477BF';
const BODY  = '#333333';
const WHITE = '#FFFFFF';

const TERMS_CSS = `
  .trm-reveal {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.72s cubic-bezier(0.22,1,0.36,1),
                transform 0.72s cubic-bezier(0.22,1,0.36,1);
  }
  .trm-reveal.in { opacity: 1; transform: translateY(0); }
  @keyframes trm-hero-in {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .trm-reveal { transition: none !important; opacity: 1 !important; transform: none !important; }
  }
`;

function useReveal(threshold = 0.12) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function TermsHero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS + TERMS_CSS }} />
      <div style={{
        position: 'relative', width: '100%',
        minHeight: 'max(320px, 40vh)',
        display: 'flex', alignItems: 'center',
        backgroundImage: `radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px), linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)`,
        backgroundSize: '24px 24px, 100% 100%',
      }}>
        <div style={{
          position: 'relative', zIndex: 1, width: '100%', maxWidth: 1200,
          margin: '0 auto', padding: '100px clamp(1.5rem, 5vw, 80px) 80px',
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12, fontWeight: 600, letterSpacing: '0.15em',
            color: BLUE, textTransform: 'uppercase', marginBottom: 20,
            opacity: 0, animation: 'trm-hero-in 720ms 80ms cubic-bezier(0.22,1,0.36,1) both',
          }}>LEGAL</div>
          <h1 style={{
            fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700,
            fontSize: 'clamp(36px, 4.5vw, 52px)',
            color: WHITE, lineHeight: 1.08, letterSpacing: '-0.03em',
            margin: '0 0 20px', maxWidth: 600,
            opacity: 0, animation: 'trm-hero-in 720ms 160ms cubic-bezier(0.22,1,0.36,1) both',
          }}>Terms of Use</h1>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 15, fontWeight: 400,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.6, margin: 0,
            opacity: 0, animation: 'trm-hero-in 720ms 240ms cubic-bezier(0.22,1,0.36,1) both',
          }}>Last updated: April 24, 2026</p>
        </div>
      </div>
    </section>
  );
}

function TermsContent() {
  const [ref, visible] = useReveal();

  const h2Style = {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontWeight: 700, fontSize: 20,
    color: NAVY, margin: '40px 0 12px',
    paddingTop: 16,
    borderTop: '1px solid #e8eef4',
  };
  const pStyle = {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 16, color: BODY, lineHeight: 1.75, margin: '0 0 20px',
  };
  const liStyle = {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 16, color: BODY, lineHeight: 1.7, marginBottom: 12,
  };

  return (
    <section style={{ background: WHITE, width: '100%', padding: '80px clamp(1.5rem, 5vw, 80px)', boxSizing: 'border-box' }}>
      <div
        ref={ref}
        className={`trm-reveal${visible ? ' in' : ''}`}
        style={{ maxWidth: 800, margin: '0 auto' }}
      >
        <h2 style={{ ...h2Style, borderTop: 'none', paddingTop: 0, marginTop: 0 }}>1. Agreement to Terms</h2>
        <p style={pStyle}>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and D8TAOPS ("we", "us", or "our"), concerning your access to and use of the D8TAOPS platform, applications, website, and related services (collectively, the "Services"). The Services provide data orchestration, governance, and related capabilities for enterprise data workflows. We are registered in Delaware, United States of America and have our registered office at 4145 Southwest Watson Avenue, Suite 350, Beaverton, OR 97005. You agree that by accessing the Services, you have read, understood, and agree to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>
        <p style={pStyle}>Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Terms of Use, and you waive any right to receive specific notice of each such change. Please ensure that you check the applicable Terms every time you use our Services so that you understand which Terms apply.</p>
        <p style={pStyle}>The information provided on the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.</p>
        <p style={pStyle}>The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).</p>
        <p style={pStyle}>The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.</p>

        <h2 style={h2Style}>2. Intellectual Property Rights</h2>
        <p style={pStyle}>Unless otherwise indicated, the Services is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Services (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions. The Content and the Marks are provided on the Services "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.</p>
        <p style={pStyle}>Provided that you are eligible to use the Services, you are granted a limited license to access and use the Services and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Services, the Content and the Marks.</p>

        <h2 style={h2Style}>3. User Representations</h2>
        <p style={pStyle}>By using the Services, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Use; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Services for any illegal or unauthorized purpose; and (5) your use of the Services will not violate any applicable law or regulation.</p>
        <p style={pStyle}>If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).</p>

        <h2 style={h2Style}>4. Fees and Payment</h2>
        <p style={pStyle}>Payments may be made via invoice, ACH, wire, or other approved methods as specified in an order form or billing agreement. Additional billing terms may be defined in applicable customer agreements.</p>

        <h2 style={h2Style}>5. Cancellation</h2>
        <p style={pStyle}>You can cancel your subscription at any time by logging into your account or contacting us using the contact information provided below. Your cancellation will take effect at the end of the current paid term.</p>
        <p style={pStyle}>If you are unsatisfied with our services, please email us at <a href="mailto:info@d8taops.com" style={{ color: BLUE, textDecoration: 'none' }}>info@d8taops.com</a> or call us at <a href="tel:+18774562001" style={{ color: BLUE, textDecoration: 'none' }}>(877) 456-2001</a>.</p>

        <h2 style={h2Style}>6. Prohibited Activities</h2>
        <p style={{ ...pStyle, marginBottom: 8 }}>You may not access or use the Services for any purpose other than that for which we make the Services available. As a user of the Services, you agree not to:</p>
        <ul style={{ paddingLeft: 24, margin: '0 0 20px' }}>
          <li style={liStyle}>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
          <li style={liStyle}>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
          <li style={liStyle}>Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</li>
          <li style={liStyle}>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
          <li style={liStyle}>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
          <li style={liStyle}>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
          <li style={liStyle}>Use the Services in a manner inconsistent with any applicable laws or regulations or engage in unauthorized framing of or linking to the Services.</li>
          <li style={liStyle}>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material that interferes with any party's uninterrupted use and enjoyment of the Services.</li>
          <li style={liStyle}>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
          <li style={liStyle}>Delete the copyright or other proprietary rights notice from any Content or attempt to impersonate another user or person.</li>
          <li style={liStyle}>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
          <li style={liStyle}>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
          <li style={liStyle}>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.</li>
          <li style={liStyle}>Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
          <li style={liStyle}>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
          <li style={liStyle}>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
        </ul>

        <h2 style={h2Style}>7. Customer Data and Feedback</h2>
        <p style={pStyle}>Customer retains all rights, title, and interest in data submitted to the Services ("Customer Data"). D8TAOPS processes Customer Data solely to provide, secure, support, and improve the Services in accordance with applicable agreements and policies.</p>
        <p style={pStyle}>Our processing of personal data is described in our <a href="/privacy" style={{ color: BLUE, textDecoration: 'none' }}>Privacy Policy</a> and, where applicable, our Data Processing Addendum.</p>
        <p style={pStyle}>You may provide feedback regarding the Services. You grant D8TAOPS a non-exclusive, worldwide, royalty-free right to use such feedback to improve the Services.</p>

        <h2 style={h2Style}>8. U.S. Government Rights</h2>
        <p style={pStyle}>Our services are "commercial items" as defined in Federal Acquisition Regulation ("FAR") 2.101. If our services are acquired by or on behalf of any agency not within the Department of Defense ("DOD"), our services are subject to the terms of these Terms of Use in accordance with FAR 12.212 (for computer software) and FAR 12.211 (for technical data). If our services are acquired by or on behalf of any agency within the Department of Defense, our services are subject to the terms of these Terms of Use in accordance with Defense Federal Acquisition Regulation ("DFARS") 227.7202‑3.</p>

        <h2 style={h2Style}>9. Services Management</h2>
        <p style={pStyle}>We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use; (3) in our sole discretion and without limitation, restrict access to, limit the availability of, or disable any content, data, or activity that violates these Terms or creates risk to the Services; (4) remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.</p>

        <h2 style={h2Style}>10. Term and Termination</h2>
        <p style={pStyle}>These Terms of Use shall remain in full force and effect while you use the Services. We may suspend or terminate access to the Services if necessary to address security risk, unlawful use, material breach of these Terms, nonpayment, or misuse of the Services. Upon termination, Customer will have a reasonable period to export Customer Data, unless access is restricted due to security, legal, or compliance requirements. D8TAOPS will delete or retain Customer Data in accordance with its data retention policies and applicable law.</p>
        <p style={pStyle}>If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.</p>

        <h2 style={h2Style}>11. Modifications and Interruptions</h2>
        <p style={pStyle}>We may update, modify, or maintain the Services in accordance with our product and support policies. We may also make changes to the Services to improve functionality, address security issues, comply with legal requirements, or support operational needs.</p>
        <p style={pStyle}>The Services may be temporarily unavailable due to maintenance, updates, security events, third-party service interruptions, or circumstances outside our reasonable control. We will use commercially reasonable efforts to maintain the Services, but we do not guarantee that the Services will be uninterrupted or error-free.</p>

        <h2 style={h2Style}>12. Governing Law</h2>
        <p style={pStyle}>These Terms are governed by applicable laws. Specific governing law, venue, and dispute resolution terms may be defined in applicable customer agreements, order forms, or other written agreements between the parties.</p>

        <h2 style={h2Style}>13. Corrections</h2>
        <p style={pStyle}>There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.</p>

        <h2 style={h2Style}>14. Disclaimer</h2>
        <p style={pStyle}>The Services is provided on an as-is and as-available basis. You agree that your use of the Services and our Services will be at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the Services and your use thereof, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We make no warranties or representations about the accuracy or completeness of the Services' content or the content of any websites linked to the Services and we will assume no liability or responsibility for any errors, mistakes, or inaccuracies of content; personal injury or property damage resulting from your access to and use of the Services; any unauthorized access to or use of our secure servers and personal or financial information stored therein; any interruption or cessation of transmission to or from the Services; or any bugs, viruses, or similar harmful material transmitted through the Services by any third party.</p>

        <h2 style={h2Style}>15. Limitations of Liability</h2>
        <p style={pStyle}>To the maximum extent permitted by law, each party's total liability arising out of or relating to these Terms or the Services will not exceed the total amount paid by Customer for the Services in the 12 months preceding the event giving rise to the claim.</p>
        <p style={pStyle}>In no event will either party be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including lost profits, lost revenue, loss of business opportunity, or loss of goodwill, even if advised of the possibility of such damages.</p>

        <h2 style={h2Style}>16. Indemnification</h2>
        <p style={pStyle}>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) use of the Services; (2) breach of these Terms of Use; (3) any breach of your representations and warranties set forth in these Terms of Use; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Services with whom you connected via the Services.</p>

        <h2 style={h2Style}>17. Electronic Communications, Transactions, and Signatures</h2>
        <p style={pStyle}>Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically satisfy any legal requirement that such communication be in writing. You hereby agree to the use of electronic signatures, contracts, orders, and other records, and to electronic delivery of notices, policies, and records of transactions initiated or completed by us or via the Services.</p>

        <h2 style={h2Style}>18. Miscellaneous</h2>
        <p style={pStyle}>These Terms of Use and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision. These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms of Use or use of the Services.</p>

        <h2 style={h2Style}>19. Contact Us</h2>
        <p style={pStyle}>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us:</p>
        <p style={{ ...pStyle, marginBottom: 8 }}>
          <strong>Phone:</strong> <a href="tel:+18774562001" style={{ color: BLUE, textDecoration: 'none' }}>(877) 456-2001</a>
        </p>
        <p style={pStyle}>
          <strong>Email:</strong> <a href="mailto:info@d8taops.com" style={{ color: BLUE, textDecoration: 'none' }}>info@d8taops.com</a>
        </p>
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <HomepageNav activePath="/terms" />
      <TermsHero />
      <TermsContent />
      <GlobalFooter />
    </>
  );
}
