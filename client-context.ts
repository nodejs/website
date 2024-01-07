import { cache } from 'react';

import type { ClientSharedServerContext } from '@/types';

export const defineClientContext = (
  props: Partial<ClientSharedServerContext>
): ClientSharedServerContext => ({
  frontmatter: props.frontmatter ?? {},
  pathname: props.pathname ?? '',
  headings: props.headings ?? [],
  readingTime: props.readingTime ?? { text: '', minutes: 0, time: 0, words: 0 },
  filename: props.filename ?? '',
});

// This allows us to have Server-Side Context's of the shared "contextual" data
// which includes the frontmatter, the current pathname from the dynamic segments
// and the current headings of the current markdown context
export const getClientContext = cache(() => {
  const serverSharedContext = defineClientContext({});

  return serverSharedContext;
});

// This is used by the dynamic router to define on the request
// the current set of information we use (shared)
export const setClientContext = (data: Partial<ClientSharedServerContext>) => {
  const _data = defineClientContext(data);

  getClientContext().frontmatter = _data.frontmatter;
  getClientContext().pathname = _data.pathname;
  getClientContext().headings = _data.headings;
  getClientContext().readingTime = _data.readingTime;
  getClientContext().filename = _data.filename;
};
