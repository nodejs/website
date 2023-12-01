import type { FC, PropsWithChildren } from 'react';

import WithBreadcrumbs from '@/components/withBreadcrumbs';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import WithProgressionSideBar from '@/components/withProgressionSidebar';
import ArticleLayout from '@/layouts/New/Article';

const LearnLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithProgressionSideBar navKey="learn" />

      {children}

      <WithMetaBar />

      <WithBreadcrumbs />
    </ArticleLayout>
  </>
);

export default LearnLayout;
