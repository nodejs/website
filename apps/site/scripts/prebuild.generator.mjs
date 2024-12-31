// @ts-check
'use strict';

import assert from 'node:assert';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { glob } from 'glob';

import { getRelativePath } from '../next.helpers.mjs';

const __dirname = getRelativePath(import.meta.url);

const generatedDir = resolve(__dirname, '..', '.generated');
mkdirSync(generatedDir, { recursive: true });

await generateFile([__dirname, '..', 'next.helpers.mjs'], async fileContent => {
  const files = await glob('**/*.{md,mdx}', { root: 'pages' });
  return fileContent.replace(
    /export const files = \[\s*\/\* generated at build time \*\/\s*\];/,
    `export const files = [\n${files
      .map(file => `  ${JSON.stringify(file)},\n`)
      .join('')}];`
  );
});

await generateFile(
  [__dirname, '..', 'next-data', 'generators', 'blogData.mjs'],
  async fileContent => {
    const { default: generateBlogData } = await import(
      '../next-data/generators/blogData.mjs'
    );
    const blogData = await generateBlogData();

    return fileContent
      .replace(
        /const result = \{\s*\/\* generated at build time \*\/\s*\};/,
        `const result = ${JSON.stringify(blogData)};`
      )
      .replace(
        " from '../../.generated/next.helpers.mjs';",
        " from './next.helpers.mjs';"
      );
  }
);

generateFile(
  [__dirname, '..', 'next-data', 'generators', 'downloadSnippets.mjs'],
  async fileContent => {
    const { generateRawDownloadSnippets } = await import(
      '../next-data/generators/downloadSnippets.mjs'
    );
    const downloadSnippets = await generateRawDownloadSnippets();

    return fileContent
      .replace(
        /const preGeneratedDownloadSnippets = \[\s*\/\* generated at build time \*\/\s*\];/,
        `const preGeneratedDownloadSnippets = ${JSON.stringify(downloadSnippets)};`
      )
      .replace(
        " from '../../next.locales.mjs';",
        " from '../next.locales.mjs';"
      );
  }
);

/**
 * @param {string[]} filePaths
 * @param {(str: string) => string|Promise<string>} replaceCallback
 * @returns {Promise<void>}
 */
async function generateFile(filePaths, replaceCallback) {
  const originalFileContent = readFileSync(resolve(...filePaths), 'utf8');

  const fileName = filePaths.at(-1);
  assert(fileName);

  const generatedFileContent = await replaceCallback(originalFileContent);
  writeFileSync(resolve(generatedDir, fileName), generatedFileContent);
}
