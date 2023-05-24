import BaseLayout from './BaseLayout';
import PrimaryDownloadMatrix from '../components/Downloads/PrimaryDownloadMatrix';
import SecondaryDownloadMatrix from '../components/Downloads/SecondaryDownloadMatrix';
import { useNextraContext } from '../hooks/useNextraContext';
import { useNodeReleases } from '../hooks/useNodeReleases';
import type { FC, PropsWithChildren } from 'react';
import type { LegacyDownloadsFrontMatter } from '../types';

const DownloadLayout: FC<PropsWithChildren> = ({ children }) => {
  const nextraContext = useNextraContext();
  const { lts } = useNodeReleases();

  const { downloads } = nextraContext.frontMatter as LegacyDownloadsFrontMatter;

  return (
    <BaseLayout>
      <div className="container">
        <article dir="auto">
          <div className="download-header">
            <h1>{downloads.headline}</h1>
          </div>

          {children}

          {lts && <PrimaryDownloadMatrix release={lts} />}
          {lts && <SecondaryDownloadMatrix release={lts} />}
        </article>
      </div>
    </BaseLayout>
  );
};

export default DownloadLayout;
