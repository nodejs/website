import { NextResponse } from 'next/server';

import provideWebsiteFeeds from '@/next-data/providers/websiteFeeds';
import { siteConfig } from '@/next.json.mjs';
import { defaultLocale } from '@/next.locales.mjs';

// We only support fetching these pages from the /en/ locale code
const locale = defaultLocale.code;

type StaticParams = { params: { feed: string; locale: string } };

// This is the Route Handler for the `GET` method which handles the request
// for Blog Feeds within the Node.js Website
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export const GET = async (_: Request, { params }: StaticParams) => {
  const websiteFeed = await provideWebsiteFeeds(params.feed);

  return new NextResponse(websiteFeed, {
    headers: { 'Content-Type': 'application/xml' },
    status: websiteFeed ? 200 : 404,
  });
};

// This function generates the static paths that come from the dynamic segments
// `en/feeds/[feed]` and returns an array of all available static paths
// this is useful for static exports, for example.
// Note that differently from the App Router these don't get built at the build time
// only if the export is already set for static export
export const generateStaticParams = async () =>
  siteConfig.rssFeeds.map(feed => ({ feed: feed.file, locale }));

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'error';
