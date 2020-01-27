/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import './tile';
import './clickable-tile';
import './radio-tile';
import './selectable-tile';
import './expandable-tile';
import storyDocs from './tile-story.mdx';

export const defaultStory = () => html`
  <bx-tile>Default tile</bx-tile>
`;

defaultStory.story = {
  name: 'Default',
};

export const clickable = ({ parameters }) => {
  const { href } = parameters?.props?.['bx-clickable-tile'] ?? {};
  return html`
    <bx-clickable-tile href="${ifNonNull(href)}">Clickable tile</bx-clickable-tile>
  `;
};

clickable.story = {
  parameters: {
    knobs: {
      'bx-clickable-tile': () => ({
        href: textNullable('Href for clickable UI (href)', ''),
      }),
    },
  },
};

export const singleSelectable = ({ parameters }) => {
  const { checkmarkLabel, name, value, onInput } = parameters?.props?.['bx-radio-tile'] ?? {};
  return html`
    <fieldset>
      <legend>Single-select tiles</legend>
      <bx-radio-tile
        checkmark-label="${ifNonNull(checkmarkLabel)}"
        name="${ifNonNull(name)}"
        value="${ifNonNull(value)}"
        @input="${onInput}"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        checkmark-label="${ifNonNull(checkmarkLabel)}"
        name="${ifNonNull(name)}"
        value="${ifNonNull(value)}"
        @input="${onInput}"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        checkmark-label="${ifNonNull(checkmarkLabel)}"
        name="${ifNonNull(name)}"
        value="${ifNonNull(value)}"
        @input="${onInput}"
      >
        Single-select Tile
      </bx-radio-tile>
    </fieldset>
  `;
};

singleSelectable.story = {
  name: 'Single-selectable',
  parameters: {
    knobs: {
      'bx-radio-tile': () => ({
        checkmarkLabel: textNullable('Label text for the checkmark icon (checkmark-label)', ''),
        name: textNullable('Name (name)', 'selectable-tile'),
        value: textNullable('Value (value)', ''),
        onInput: action('input'),
      }),
    },
  },
};

export const multiSelectable = ({ parameters }) => {
  const { checkmarkLabel, name, selected, value, onInput } = parameters?.props?.['bx-selectable-tile'] ?? {};
  return html`
    <bx-selectable-tile
      checkmark-label="${ifNonNull(checkmarkLabel)}"
      name="${ifNonNull(name)}"
      ?selected="${selected}"
      value="${ifNonNull(value)}"
      @input="${onInput}"
    >
      Multi-select Tile
    </bx-selectable-tile>
  `;
};

multiSelectable.story = {
  name: 'Multi-selectable',
  parameters: {
    knobs: {
      'bx-selectable-tile': () => ({
        ...singleSelectable.story.parameters.knobs['bx-radio-tile'](),
        selected: boolean('Selected (selected)', false),
      }),
    },
  },
};

export const expandable = ({ parameters }) => {
  const { expanded, disableChange, onBeforeChange, onAfterChange } = parameters?.props?.['bx-expandable-tile'] ?? {};
  const handleBeforeChanged = (event: CustomEvent) => {
    onBeforeChange(event);
    if (disableChange) {
      event.preventDefault();
    }
  };
  return html`
    <bx-expandable-tile
      ?expanded="${expanded}"
      @bx-expandable-tile-beingchanged=${handleBeforeChanged}
      @bx-expandable-tile-changed=${onAfterChange}
    >
      <bx-tile-above-the-fold-content style="height: 200px">
        Above the fold content here
      </bx-tile-above-the-fold-content>
      <bx-tile-below-the-fold-content style="height: 300px">
        Below the fold content here
      </bx-tile-below-the-fold-content>
    </bx-expandable-tile>
  `;
};

expandable.story = {
  parameters: {
    knobs: {
      'bx-expandable-tile': () => ({
        expanded: boolean('Expanded (expanded)', false),
        disableChange: boolean(
          'Disable user-initiated change in expanded state ' +
            '(Call event.preventDefault() in bx-expandable-tile-beingchanged event)',
          false
        ),
        onBeforeChange: action('bx-expandable-tile-beingchanged'),
        onAfterChange: action('bx-expandable-tile-changed'),
      }),
    },
  },
};

export default {
  title: 'Tile',
  decorators: [
    story =>
      html`
        <div>${story()}</div>
      `,
  ],
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};
