// we shim @opentelemetry/api to the throwing shim so that it will throw right away, this is so that we throw inside the
// try block here: https://github.com/vercel/next.js/blob/9e8266a7/packages/next/src/server/lib/trace/tracer.ts#L27-L31
// causing the code to require the 'next/dist/compiled/@opentelemetry/api' module instead (which properly works)

// IMPORTANT: we already do that in the open-next Cloudflare adapter, it shouldn't be necessary here too
//            (https://github.com/opennextjs/opennextjs-cloudflare/issues/219 seems to be the same issue)
throw new Error();
