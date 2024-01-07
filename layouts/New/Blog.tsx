import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import { getClientContext } from '@/client-context';
import WithBlogCategories from '@/components/withBlogCategories';
import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';
import getBlogData from '@/next-data/blogData';

import styles from './layouts.module.css';

const getBlogCategory = async (pathname: string) => {
  // pathname format can either be: /en/blog/{category}
  // or /en/blog/{category}/page/{page}
  // hence we attempt to interpolate the full /en/blog/{categoy}/page/{page}
  // and in case of course no page argument is provided we define it to 1
  // note that malformed routes can't happen as they are all statically generated
  const [, , category = 'all', , page = 1] = pathname.split('/');

  const { posts, pagination } = await getBlogData(category, Number(page));

  return { category, posts, pagination, page: Number(page) };
};

const BlogLayout: FC = async () => {
  const { pathname } = getClientContext();
  const t = await getTranslations();

  const predefinedBlogCategories = [
    {
      key: 'all',
      label: t('layouts.blog.categories.all'),
    },
    {
      key: 'announcements',
      label: t('layouts.blog.categories.announcements'),
    },
    {
      key: 'release',
      label: t('layouts.blog.categories.release'),
    },
    {
      key: 'vulnerability',
      label: t('layouts.blog.categories.vulnerability'),
    },
  ];

  const blogData = await getBlogCategory(pathname);

  return (
    <>
      <WithNavBar />

      <main className={styles.blogLayout}>
        <h1>{t('layouts.blog.title')}</h1>

        <h4>{t('layouts.blog.subtitle')}</h4>

        <WithBlogCategories
          categories={predefinedBlogCategories}
          blogData={blogData}
        />
      </main>

      <WithFooter />
    </>
  );
};

export default BlogLayout;
