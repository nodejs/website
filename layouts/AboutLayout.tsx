import type { PropsWithChildren } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import SideNavigation from '../components/SideNavigation';

const AboutLayout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <main id="main">
      <div className="container has-side-nav">
        <SideNavigation navigationKey="about" />
        <article dir="auto">{children}</article>
      </div>
    </main>
    <Footer />
  </>
);

export default AboutLayout;
