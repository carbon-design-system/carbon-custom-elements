/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-html';
import { boolean } from '@storybook/addon-knobs';
import ifNonNull from '../../globals/directives/if-non-null';
import './structured-list';
import './structured-list-head';
import './structured-list-header-row';
import './structured-list-header-cell';
import './structured-list-body';
import './structured-list-row';
import './structured-list-cell';
import storyDocs from './structured-list-story.mdx';

export const defaultStory = ({ parameters }) => {
  const { hasSelection } = parameters?.props?.['bx-structured-list'] ?? {};
  const selectionName = !hasSelection ? undefined : 'structured-list-selection';
  const selectionValues = !hasSelection
    ? []
    : ['structured-list-selection-0', 'structured-list-selection-1', 'structured-list-selection-2'];
  return html`
    <bx-structured-list ?has-selection=${hasSelection}>
      <bx-structured-list-head>
        <bx-structured-list-header-row ?has-selection=${hasSelection}>
          <bx-structured-list-header-cell>ColumnA</bx-structured-list-header-cell>
          <bx-structured-list-header-cell>ColumnB</bx-structured-list-header-cell>
          <bx-structured-list-header-cell>ColumnC</bx-structured-list-header-cell>
        </bx-structured-list-header-row>
      </bx-structured-list-head>
      <bx-structured-list-body>
        <bx-structured-list-row selection-name=${ifNonNull(selectionName)} selection-value=${ifNonNull(selectionValues[0])}>
          <bx-structured-list-cell>Row 1</bx-structured-list-cell>
          <bx-structured-list-cell>Row 1</bx-structured-list-cell>
          <bx-structured-list-cell
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.</bx-structured-list-cell
          >
        </bx-structured-list-row>
        <bx-structured-list-row selection-name=${ifNonNull(selectionName)} selection-value=${ifNonNull(selectionValues[1])}>
          <bx-structured-list-cell>Row 2</bx-structured-list-cell>
          <bx-structured-list-cell>Row 2</bx-structured-list-cell>
          <bx-structured-list-cell
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.</bx-structured-list-cell
          >
        </bx-structured-list-row>
        <bx-structured-list-row selection-name=${ifNonNull(selectionName)} selection-value=${ifNonNull(selectionValues[2])}>
          <bx-structured-list-cell>Row 3</bx-structured-list-cell>
          <bx-structured-list-cell>Row 3</bx-structured-list-cell>
          <bx-structured-list-cell
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.</bx-structured-list-cell
          >
        </bx-structured-list-row>
      </bx-structured-list-body>
    </bx-structured-list>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Structured list',
  parameters: {
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-structured-list': () => ({
        hasSelection: boolean('Supports selection feature (has-selection)', false),
      }),
    },
  },
};
