/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import './skeleton-placeholder';

export const defaultStory = () =>
  html`
    <bx-skeleton-placeholder></bx-skeleton-placeholder>
  `;

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Skeleton placeholder',
};
