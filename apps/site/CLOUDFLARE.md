# nodejs.org on OpenNext for Cloudflare

## Getting started

To develop, build, preview, and deploy nodejs.org, execute the following commands to get started:

```
nvm use
npm install
cd apps/site
```

## Developing locally

To develop locally, run the usual:

```
npm run dev
```

## Build nodejs.org production distribution using OpenNext

To build you need connection to the Internet because the build system will try to fetch the following files:

- https://nodejs.org/dist/index.json
- https://raw.githubusercontent.com/nodejs/Release/master/schedule.json

```
npm run cf:build
```

## Preview a production build locally

You can preview production build locally using [wrangler](https://developers.cloudflare.com/workers/wrangler/):

```
npm run cf:preview
```

## Deploying a build to production

To build and deploy the application run:

```
npm run cf:deploy
```

The build is currently deployed to a dedicated "nodejs.org" (Cloudflare account id: 8ed4d03ac99f77561d0e8c9cbcc76cb6): https://nodejs-website.web-experiments.workers.dev

You can monitor and configure the project at https://dash.cloudflare.com/8ed4d03ac99f77561d0e8c9cbcc76cb6/workers/services/view/nodejs-website/production

## TODOs

The following is an incomplete list of tasks and problems that still need to be resolved:

- [x] update `@opennextjs/cloudflare` to the latest in `/apps/site/package.json`
- [x] sort out issues with `eval` and MDX (Claudio is looking into this one)
- [x] and undo edits in `./app/[locale]/[[...path]]/page.tsx`
- [x] reimplement `getMarkdownFiles` in `next.helpers.mjs` to be generated at build time
  - this can be accomplished either via a npm/turbo prebuild task, or possibly as part of next.js SSG/staticProps but
  - [ ] we need to ensure that we don't end up accidentally downloading this big file to the client as part of hydration
  - [x] once we have easy access to the list of files, we should roll back changes to `next-data/providers/blogData.ts`
- [x] back out most changes from `next.dynamic.mjs`
  - [x] instead of using runtime detection via `globalThis.navigator?.userAgent`, we should instead use `alias` feature in `wrangler.toml` to override the implementation of `node:fs` calls but only when running in workerd as we need the build to keep on running in node.js for SSG to work
  - [x] could we reimplement the `existsAsync` call as sync `exists` which consults `getMarkdownFiles` from the task above?
- [ ] remove symlink hack in `package.json#build:cloudflare`
  - would it be possible to make the pages directory part of assets in a less hacky way?
  - [ ] move these files under `.open-next/assets/cdn-cgi/pages` so that these raw md files are not publicly accessible as that could become a maintenance burden down the road.
- [ ] wire up the changes with turborepo (right now just plain npm scripts are used)
- [ ] reenable minification in `next.config.mjs`
- [ ] remove as many `alias`es as possible from the `wrangler.toml` file
      (the `alias`es that can't be removed should be fully investigated and documented)
- [ ] fix flashes of unstyled content present on hard navigation
- [x] enable caching
- [x] fix routes for languages besides `en` 404ing
