/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { html, customElement, LitElement } from 'lit-element';
import styles from './tile.scss';

const { prefix } = settings;

/**
 * Basic tile.
 */
@customElement(`${prefix}-tile`)
class BXTile extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default BXTile;
