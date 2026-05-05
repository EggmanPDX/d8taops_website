import React from 'react';
import HomepageNav from './HomepageNav';
import { GLOBAL_CSS, GlobalFooter } from './HomepageSections';

const NAVY  = '#081F5C';
const BLUE  = '#0477BF';
const BODY  = '#333333';
const WHITE = '#FFFFFF';

const PRIVACY_CSS = `
  .prv-reveal {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.72s cubic-bezier(0.22,1,0.36,1),
                transform 0.72s cubic-bezier(0.22,1,0.36,1);
  }
  .prv-reveal.in { opacity: 1; transform: translateY(0); }
  @keyframes prv-hero-in {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .prv-reveal { transition: none !important; opacity: 1 !important; transform: none !important; }
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

function PrivacyHero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS + PRIVACY_CSS }} />
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
            opacity: 0, animation: 'prv-hero-in 720ms 80ms cubic-bezier(0.22,1,0.36,1) both',
          }}>LEGAL</div>
          <h1 style={{
            fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700,
            fontSize: 'clamp(36px, 4.5vw, 52px)',
            color: WHITE, lineHeight: 1.08, letterSpacing: '-0.03em',
            margin: '0 0 20px', maxWidth: 600,
            opacity: 0, animation: 'prv-hero-in 720ms 160ms cubic-bezier(0.22,1,0.36,1) both',
          }}>Privacy Policy</h1>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 15, fontWeight: 400,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.6, margin: 0,
            opacity: 0, animation: 'prv-hero-in 720ms 240ms cubic-bezier(0.22,1,0.36,1) both',
          }}>Last updated: August 05, 2025</p>
        </div>
      </div>
    </section>
  );
}

function PrivacyContent() {
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
        className={`prv-reveal${visible ? ' in' : ''}`}
        style={{ maxWidth: 800, margin: '0 auto' }}
      >
        <p style={{ ...pStyle, fontSize: 17, lineHeight: 1.8 }}>
          At D8TAOPS Inc. ("we," or "us"), we value the privacy of individuals who use our websites and related services (collectively, our "Services"). This Privacy Notice explains how we collect, use, and share the personal information of users of our Services ("users," "you," or "your"). By using our Services, you agree to the collection, use, disclosure, and processing of your information as described by this Privacy Notice.
        </p>
        <p style={pStyle}>
          Personal information is information that identifies or could be used to identify a specific person. Personal information does not include deidentified information (anonymized or pseudonymized) or aggregated information derived from personal information.
        </p>
        <p style={pStyle}>
          We may collect a variety of personal information and other information about you or your devices from various sources, as described below.
        </p>

        <h2 style={h2Style}>Information You Provide to Us</h2>
        <p style={pStyle}><strong>Registration Information.</strong> If you sign up for an account, register to use our Services, or sign up for emails or other updates, we may ask you for basic contact information, such as your name, email address, phone number, and/or mailing address. We may also collect certain demographic information when you register for our Services, including your age, gender, personal interests, income, and/or marital status.</p>
        <p style={pStyle}><strong>Communications.</strong> If you contact us directly, we may collect additional information from you. For example, when you reach out to our customer support team, we may ask for your name, email address, mailing address, phone number, or other contact information so that we can verify your identity and communicate with you. We may also store the contents of any message or attachments that you send to us, as well as any information you submit through any of our forms or questionnaires.</p>
        <p style={pStyle}><strong>Events.</strong> If you register for an event that we host, whether in-person or online, we may collect relevant information such as your name, address, title, company, phone number, or email address, as well as specific information relevant to the event for which you are registering.</p>
        <p style={pStyle}><strong>User Content.</strong> We may allow you and other Users of our Services to share their own content with others. This may include posts, comments, reviews, or other User-generated content. Unless otherwise noted when creating such content, this information may be shared publicly through our Services.</p>
        <p style={pStyle}><strong>Payment Information.</strong> If you make a purchase through our Services, we (or a third-party payment processor acting on our behalf) may collect your payment-related information, such as credit card or other financial information.</p>
        <p style={pStyle}><strong>Job Applications.</strong> If you apply for a job with us, we may collect relevant information such as your name, phone number, email address, position, job history, education history, references, a cover letter, and other similar information.</p>

        <h2 style={h2Style}>Information We Collect Automatically When You Use Our Services</h2>
        <p style={pStyle}><strong>Device Information.</strong> We may collect information about the devices and software you use to access our Services, such as your IP address, web browser type, operating system version, device identifiers, and other similar information.</p>
        <p style={pStyle}><strong>Usage Information.</strong> To help us understand how you use our Services and to help us improve them, we may collect data about your interactions with our Services. This includes, but is not limited to, information such as crash reports, session lengths and times, the specific pages and other content you view, and any searches you conduct on our site.</p>
        <p style={pStyle}><strong>Cookies and Similar Technologies.</strong> We and our third-party partners may collect information using cookies, pixel tags, or similar technologies. Cookies are small text files containing a string of alphanumeric characters. We may use both session cookies and persistent cookies. A session cookie disappears after you close your browser. A persistent cookie remains after you close your browser and may be used by your browser on subsequent visits to our Services.</p>

        <h2 style={h2Style}>Information We Receive from Other Sources</h2>
        <p style={pStyle}>We may receive information about you from other sources, including third parties that help us update, expand, and analyze our records, identify new customers, or detect or prevent fraud. What information we receive from third parties is governed by the privacy settings, policies, and/or procedures of the relevant organizations, and we encourage you to review them.</p>

        <h2 style={h2Style}>How We Use the Information We Collect</h2>
        <p style={{ ...pStyle, marginBottom: 8 }}>We may use the information we collect:</p>
        <ul style={{ paddingLeft: 24, margin: '0 0 20px' }}>
          {[
            'To provide, maintain, improve, and enhance our Services;',
            'To understand and analyze how you use our Services and develop new products, services, features, and functionality;',
            'To facilitate purchases of products or services that you order;',
            'To host events;',
            'To allow you to share content with other Users of our Services;',
            'To evaluate and process applications for jobs with us;',
            'To communicate with you, provide you with updates and other information relating to our Services, provide information that you request, respond to comments and questions, and otherwise provide User support;',
            'For marketing and advertising purposes, including developing and providing promotional and advertising materials that may be relevant, valuable or otherwise of interest to you;',
            'To detect and prevent fraud, and respond to trust and safety issues that may arise;',
            'In connection with generative AI applications;',
            'For compliance purposes, including enforcing our Terms of Use or other legal rights, or as may be required by applicable laws and regulations or requested by any judicial process or governmental agency; and',
            'For other purposes for which we provide specific notice at the time the information is collected.',
          ].map((item, i) => <li key={i} style={liStyle}>{item}</li>)}
        </ul>

        <h2 style={h2Style}>How We Share the Information We Collect</h2>
        <p style={pStyle}><strong>Service Providers.</strong> We may share any information we collect with service providers retained in connection with the provision of our Services. These companies are permitted to use this information to help us provide our Services, to improve the services they provide us, and for other purposes disclosed in this Privacy Notice.</p>
        <p style={pStyle}><strong>Our Affiliates and Representatives.</strong> We may share your information with our affiliates, subsidiaries, and representatives as needed to provide our Services.</p>
        <p style={pStyle}><strong>Other Users.</strong> Content you post on our websites, including comments, may be displayed to other Users as appropriate.</p>
        <p style={pStyle}><strong>Our Advertising and Analytics Partners.</strong> We work with our Service Providers and other analytics and/or advertising partners to collect and process certain analytics data regarding your use of our Services and to conduct advertising via cookies. Partners may include Google, Meta, LinkedIn, and Microsoft. For a current list of specific partners, contact us at <a href="mailto:info@d8taops.com" style={{ color: BLUE, textDecoration: 'none' }}>info@d8taops.com</a>.</p>
        <p style={pStyle}><strong>As Required by Law and Similar Disclosures.</strong> We may access, preserve, and disclose your information if we believe doing so is required or appropriate to: (a) comply with law enforcement requests and legal process, such as a court order or subpoena; (b) respond to your requests; or (c) protect your, our, or others' rights, property, or safety.</p>
        <p style={pStyle}><strong>Events.</strong> We may share your information with event partners or co-sponsors to facilitate the events for which you register.</p>
        <p style={pStyle}><strong>Merger, Sale, or Other Asset Transfers.</strong> We may transfer your information to service providers, advisors, potential transactional partners, or other third parties in connection with the consideration, negotiation, or completion of a corporate transaction in which we are acquired by or merged with another company or in which we sell, liquidate, or transfer all or a portion of our assets.</p>
        <p style={pStyle}><strong>Consent.</strong> We may also disclose your information with your permission.</p>

        <h2 style={h2Style}>Your Choices</h2>
        <p style={pStyle}><strong>Our Communications.</strong> From time to time, you may receive marketing or other informational email messages from us. You can unsubscribe from our promotional and informational emails via the link provided in the emails. After opting out, users may continue to receive administrative messages necessary to service their accounts.</p>
        <p style={pStyle}><strong>Cookies.</strong> Most web browsers allow you to manage cookies through the browser settings. To find out more about cookies, visit <a href="https://www.aboutcookies.org" style={{ color: BLUE, textDecoration: 'none' }}>www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" style={{ color: BLUE, textDecoration: 'none' }}>www.allaboutcookies.org</a>.</p>
        <p style={pStyle}><strong>Our Partners.</strong> You can learn more about Google's privacy practices and your options on Google's website. Meta provides information about how it uses collected information in its Data Policy. To inquire about your choices regarding our business partners generally, contact us at <a href="mailto:info@d8taops.com" style={{ color: BLUE, textDecoration: 'none' }}>info@d8taops.com</a>.</p>

        <h2 style={h2Style}>Third-Party Content</h2>
        <p style={pStyle}>Our Services may contain links to other websites, products, or services that we do not own or operate. We are not responsible for the content provided by, or the privacy practices of, these third parties. This Privacy Notice does not apply to your activities on these third-party services or any information you disclose to these third parties. We encourage you to read their privacy policies before providing any information to them.</p>

        <h2 style={h2Style}>Security</h2>
        <p style={pStyle}>We make reasonable efforts to protect your information by using administrative, technological, and physical safeguards designed to improve the security of the information we maintain and protect it from accidental loss, unauthorized access or use, or any other inappropriate or unlawful processing. Because no information system can be 100% secure, we cannot guarantee the absolute security of your information.</p>

        <h2 style={h2Style}>Children's Privacy</h2>
        <p style={pStyle}>We do not knowingly collect, maintain, or use information from children under 13 years of age, and no part of our Services are directed toward children. If you learn that a child has provided us with information in violation of this Privacy Notice, you may alert us at <a href="mailto:info@d8taops.com" style={{ color: BLUE, textDecoration: 'none' }}>info@d8taops.com</a>.</p>

        <h2 style={h2Style}>International Visitors</h2>
        <p style={pStyle}>Our Services are hosted in the United States and intended for use by individuals located within the United States. If you choose to use the Services from the European Union or other regions of the world with laws governing data collection and use that may differ from U.S. law, please note that you are transferring your information outside of those regions to the United States for storage and processing. By using our Services, you consent to the transfer, storage, and processing of your information as described in this Privacy Notice.</p>

        <h2 style={h2Style}>Changes to this Privacy Notice</h2>
        <p style={pStyle}>We will post any adjustments to the Privacy Notice on this page, and the revised version will be effective when it is posted. If we make material changes, we may notify you via a notice posted on our website or another method. We encourage you to read this Privacy Notice periodically to stay up to date about our privacy practices.</p>

        <h2 style={h2Style}>Contact Us</h2>
        <p style={pStyle}>All feedback, comments, requests for technical support, and other communications relating to the Sites and our data collection and processing activities should be directed to: <a href="mailto:info@d8taops.com" style={{ color: BLUE, textDecoration: 'none' }}>info@d8taops.com</a>.</p>
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <HomepageNav activePath="/privacy" />
      <PrivacyHero />
      <PrivacyContent />
      <GlobalFooter />
    </>
  );
}
