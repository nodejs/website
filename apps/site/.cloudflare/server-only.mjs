// In our aliased fs code: apps/site/.cloudflare/node/fs/promises.mjs we are importing `getCloudflareContext`
// from `@opennextjs/cloudflare`, this in turn imports from `server-only`, this aliasing makes it so that
// server-only is not actually removed from the final bundle as it would otherwise cause an incorrect server
// internal error
