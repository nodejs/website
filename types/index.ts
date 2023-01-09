// @TODO: These types will be splitted on individual files for better organisation in the future

export interface RSSFeed {
  link: string;
  title: string;
  description?: string;
  blogCategory?: string;
}

export interface WebsiteBanner {
  startDate: string;
  endDate: string;
  text: string;
  link: string;
}

export interface TwitterConfig {
  username: string;
  card: string;
  img: string;
  imgAlt: string;
}

export interface OGConfig {
  imgType: string;
  imgWidth: string;
  imgHeight: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  featuredImage: string;
  favicon: string;
  accentColor: string;
  og: OGConfig;
  twitter: TwitterConfig;
  rssFeeds: Array<RSSFeed>;
  websiteBanners: Record<string, WebsiteBanner>;
}

// @TODO: These are legacy layouts that are going to be replaced with the `nodejs/nodejs.dev` Layouts in the future
export type LegacyLayouts =
  | 'about.hbs'
  | 'blog-index.hbs'
  | 'blog-post.hbs'
  | 'category-index.hbs'
  | 'contribute.hbs'
  | 'index.hbs'
  | 'docs.hbs'
  | 'download.hbs'
  | 'download-current.hbs'
  | 'download-releases.hbs'
  | 'page.hbs';

// @TODO: This is the legacy frontmatter configuration going to be replaced in the future with the `ndoejs/nodejs.dev` one
// this is going to be done via a script that replaces layouts
// Note.: The current legacy pages have other frontmatter entries but they're irrelevant
export interface LegacyFrontMatter {
  layout: LegacyLayouts;
  title?: string;
  robots?: string;
}

// @TODO: This is the legacy frontmatter configuration going to be replaced in the future with the `ndoejs/nodejs.dev` one
// this is going to be done via a script that replaces layouts
export interface LegacyBlogFrontMatter extends LegacyFrontMatter {
  author: string;
  date: string;
}
