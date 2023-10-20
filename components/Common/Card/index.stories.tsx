import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Card from './index';

type Story = StoryObj<typeof Card>;
type Meta = MetaObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Node.js March 17th Infrastructure Incident Post-mortem',
    type: 'vulnerability',
    subtitle: 'Vulnerabilities',
    description:
      'Starting on March 15th and going through to March 17th (with much of the issue being mitigated on the 16th), users were receiving intermittent 404 responses when trying to download Node.js from nodejs.org, or even accessing parts of the website.',
    author: {
      firstName: 'Hayden',
      lastName: 'Bleasel',
      src: 'https://avatars.githubusercontent.com/u/',
    },
    date: new Date(),
  },
  decorators: [
    Story => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export default { component: Card } as Meta;
