import classNames from 'classnames';
import dedent from 'dedent';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import type { FC, PropsWithChildren } from 'react';

import MDXCodeBox from '@/components/MDX/CodeBox';
import { reactRuntime } from '@/next.mdx.compiler.mjs';
import { highlightToHast, shikiPromise } from '@/util/getHighlighter';

type CodeBoxProps = {
  language: string;
  showCopyButton?: boolean;
  className?: string;
};

const codeToHast = highlightToHast(await shikiPromise);

const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = ({
  children,
  language,
  showCopyButton,
  className,
}) => {
  const out = codeToHast(dedent(children as string), language);

  return toJsxRuntime(out, {
    ...reactRuntime,
    components: {
      pre: ({ children }) => (
        <MDXCodeBox
          showCopyButton={showCopyButton ? 'true' : undefined}
          className={classNames(`language-${language}`, className)}
        >
          {children}
        </MDXCodeBox>
      ),
    },
  });
};

export default CodeBox;
