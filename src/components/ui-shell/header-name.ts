/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, customElement, LitElement } from 'lit-element';
import styles from './header.scss';

const { prefix } = settings;

/**
 * The product name UI in header nav.
 */
@customElement(`${prefix}-header-name`)
class BXHeaderName extends LitElement {
  /**
   * Link `href`. Corresponds to the attribute with the same name.
   */
  @property()
  href!: string;

  /**
   * The product name prefix. Corresponds to the attribute with the same name.
   */
  @property()
  prefix!: string;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { href, prefix: namePrefix } = this;
    const namePrefixPart = !namePrefix
      ? undefined
      : html`
          <span class="${prefix}--header__name--prefix">${namePrefix}</span>
        `;
    return html`
      <a class="${prefix}--header__name" href="${ifDefined(href)}">${namePrefixPart}&nbsp;<slot></slot></a>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXHeaderName;
