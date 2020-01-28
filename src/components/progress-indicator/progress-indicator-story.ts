/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import './progress-indicator';
import './progress-step';
import storyDocs from './progress-indicator-story.mdx';

export const defaultStory = ({ parameters }) => {
  const { vertical } = parameters?.props?.['bx-progress-indicator'] ?? {};
  const { iconLabel, labelText, secondaryLabelText } = parameters?.props?.['bx-progress-step'] ?? {};
  return html`
    <bx-progress-indicator ?vertical="${vertical}">
      <bx-progress-step
        icon-label="${ifNonNull(iconLabel)}"
        label-text="${ifNonNull(labelText)}"
        secondary-label-text="${ifNonNull(secondaryLabelText)}"
        state="invalid"
      ></bx-progress-step>
      <bx-progress-step
        icon-label="${ifNonNull(iconLabel)}"
        label-text="${ifNonNull(labelText)}"
        secondary-label-text="${ifNonNull(secondaryLabelText)}"
        state="complete"
      ></bx-progress-step>
      <bx-progress-step
        icon-label="${ifNonNull(iconLabel)}"
        label-text="${ifNonNull(labelText)}"
        secondary-label-text="${ifNonNull(secondaryLabelText)}"
        state="current"
      ></bx-progress-step>
      <bx-progress-step
        disabled
        icon-label="${ifNonNull(iconLabel)}"
        label-text="${ifNonNull(labelText)}"
        secondary-label-text="${ifNonNull(secondaryLabelText)}"
      ></bx-progress-step>
      <bx-progress-step
        icon-label="${ifNonNull(iconLabel)}"
        label-text="${ifNonNull(labelText)}"
        secondary-label-text="${ifNonNull(secondaryLabelText)}"
      ></bx-progress-step>
    </bx-progress-indicator>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Progress indicator',
  parameters: {
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-progress-indicator': () => ({
        vertical: boolean('Vertical (vertical)', false),
      }),
      'bx-progress-step': () => ({
        iconLabel: textNullable('Icon label (icon-label)', ''),
        labelText: textNullable('Primary label text (label-text)', 'Label'),
        secondaryLabelText: textNullable('Secondary label text (secondary-label-text)', 'Secondary label'),
      }),
    },
  },
};
