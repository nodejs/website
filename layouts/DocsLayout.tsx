import BaseLayout from './BaseLayout';
import SideNavigation from '../components/SideNavigation';
import { useNodeReleasesData } from '../hooks/useNodeReleasesData';
import type { FC, PropsWithChildren } from 'react';

const DocsLayout: FC<PropsWithChildren> = ({ children }) => {
  const { lts, current } = useNodeReleasesData();

  const translationContext = {
    apiLts: {
      ltsNodeVersion: `v${lts?.major}.x`,
      fullLtsNodeVersion: `v${lts?.version}`,
      spanLts: <span className="small color-lightgray">LTS</span>,
    },
    apiCurrent: {
      fullCurrentNodeVersion: `v${current?.version}`,
      currentNodeVersion: `v${current?.major}.x`,
    },
  };

  return (
    <BaseLayout>
      <div className="container has-side-nav">
        <SideNavigation navigationKey="docs" context={translationContext} />
        <article dir="auto">{children}</article>
      </div>
    </BaseLayout>
  );
};

export default DocsLayout;
