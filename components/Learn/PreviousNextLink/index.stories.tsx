import PrevNextLink from '.';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof PrevNextLink>;
type Meta = MetaObj<typeof PrevNextLink>;

export const Default: Story = {
  args: {
    previous: { slug: '/previous' },
    next: { slug: '/next' },
  },
};

export default { component: PrevNextLink } as Meta;
