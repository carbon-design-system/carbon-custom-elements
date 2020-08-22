/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import './link';
import storyDocs from './link-story.mdx';

export const Default = (_, { parameters }) => {
  const { disabled, download, href, hreflang, linkRole, ping, rel, target, type, onClick } = parameters?.props?.['bx-link'] ?? {};
  return html`
    <bx-link
      ?disabled="${disabled}"
      download="${ifNonNull(download)}"
      href="${ifNonNull(href)}"
      hreflang="${ifNonNull(hreflang)}"
      link-role="${ifNonNull(linkRole)}"
      ping="${ifNonNull(ping)}"
      rel="${ifNonNull(rel)}"
      target="${ifNonNull(target)}"
      type="${ifNonNull(type)}"
      @click="${onClick}"
    >
      Link
    </bx-link>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Link',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'bx-link': () => ({
        disabled: boolean('Disabled (disabled)', false),
        href: textNullable('Link href (href)', 'https://github.com/carbon-design-system/carbon-web-components'),
        onClick: action('click'),
      }),
    },
  },
};
