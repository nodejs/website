import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { getNodejsChangelog } from '../../util/getNodeJsChangelog';
import { getNodeApiLink } from '../../util/getNodeApiLink';
import { useNodeReleasesData } from '../../hooks/useNodeReleasesData';
import type { FC } from 'react';

type DownloadReleasesTableProps = {};

const DownloadReleasesTable: FC<DownloadReleasesTableProps> = () => {
  const { nodeReleasesData } = useNodeReleasesData();

  return (
    <table id="tbVersions" className="download-table full-width">
      <thead>
        <tr>
          <td>Version</td>
          <td>LTS</td>
          <td>Date</td>
          <td>V8</td>
          <td>npm</td>
          <td>
            NODE_MODULE_VERSION<Link href="#ref-1">[1]</Link>
            <span id="backref-1"></span>
          </td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {nodeReleasesData.map(release => (
          <tr key={release.major}>
            <td data-label="Version">Node.js {release.version}</td>
            <td data-label="LTS">{release.codename}</td>
            <td data-label="Date">
              <time>{release.releaseDate}</time>
            </td>
            <td data-label="V8">{release.v8}</td>
            <td data-label="npm">{release.npm}</td>
            <td data-label="NODE_MODULE_VERSION">{release.modules}</td>
            <td className="download-table-last">
              <a
                href={`https://nodejs.org/download/release/v${release.version}`}
              >
                <FormattedMessage id="components.downloadReleasesTable.releases" />
              </a>
              <a href={getNodejsChangelog(`v${release.version}`)}>
                <FormattedMessage id="components.downloadReleasesTable.changelog" />
              </a>
              <a href={getNodeApiLink(`v${release.version}`)}>
                <FormattedMessage id="components.downloadReleasesTable.docs" />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DownloadReleasesTable;
