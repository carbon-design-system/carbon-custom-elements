/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { html, property, customElement, LitElement } from 'lit-element';
import styles from './dropdown.scss';

const { prefix } = settings;

/**
 * Dropdown item.
 */
@customElement(`${prefix}-dropdown-item`)
class BXDropdownItem extends LitElement {
  /**
   * `true` if this dropdown item should be highlighted. Corresponds to the attribute with the same name.
   * If `true`, parent `<dropdown>` selects/deselects this dropdown item upon keyboard interaction.
   */
  @property({ type: Boolean, reflect: true })
  highlighted = false;

  /**
   * `true` if this dropdown item should be selected. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The `value` attribute that is set to the parent `<bx-dropdown>` when this dropdown item is selected.
   * Corresponds to the attribute with the same name.
   */
  @property()
  value = '';

  render() {
    return html`
      <div class="${prefix}--list-box__menu-item__option">
        <slot></slot>
      </div>
    `;
  }

  static styles = styles;
}

export default BXDropdownItem;
