import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { sanitize } from 'isomorphic-dompurify';
import styles from './index.module.scss';
import { dateIsBetween } from '../../../util/dateIsBetween';
import { isAbsoluteUrl } from '../../../util/isAbsoluteUrl';
import type { FC } from 'react';
import type { WebsiteBanner } from '../../../types';

const useTextContent = ({ text, link }: WebsiteBanner, bannerBtnText: string) =>
  useMemo(() => {
    if (text) {
      return (
        <p>
          <a
            href={link}
            className={styles.bannerBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            {bannerBtnText || 'Read More'}
          </a>
          {text}
        </p>
      );
    }

    return null;
  }, [text, link, bannerBtnText]);

const useHtmlContent = ({ html, link }: WebsiteBanner) =>
  useMemo(() => {
    if (html) {
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          dangerouslySetInnerHTML={{ __html: sanitize(html) }}
        />
      );
    }

    return null;
  }, [html, link]);

type BannerProps = { bannersIndex: WebsiteBanner };

const Banner: FC<BannerProps> = props => {
  const { formatMessage } = useIntl();

  const showBanner = dateIsBetween(
    props.bannersIndex.startDate,
    props.bannersIndex.endDate
  );

  const link = !isAbsoluteUrl(props.bannersIndex.link)
    ? `http://nodejs.org/${props.bannersIndex.link}`
    : props.bannersIndex.link;

  const textContent = useTextContent(
    { ...props.bannersIndex, link },
    formatMessage({ id: 'components.common.banner.button.text' })
  );

  const htmlContent = useHtmlContent({ ...props.bannersIndex, link });

  if (showBanner) {
    return (
      <div className={styles.banner}>
        {props.bannersIndex.text ? textContent : htmlContent}
      </div>
    );
  }

  return null;
};

export default Banner;
