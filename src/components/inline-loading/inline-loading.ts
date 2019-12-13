/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import CheckmarkFilled16 from '@carbon/icons/lib/checkmark--filled/16';
import Error20 from '@carbon/icons/lib/error/20';
import settings from 'carbon-components/es/globals/js/settings';
import LOADING_TYPE from '../loading/types';
import getLoadingIcon from '../loading/loading-icon';
import styles from './inline-loading.scss';

const { prefix } = settings;

/**
 * Loading state for inline loading spinner.
 */
export enum INLINE_LOADING_STATE {
  /**
   * Inactive state.
   */
  INACTIVE = 'inactive',

  /**
   * State for loading in progress.
   */
  ACTIVE = 'active',

  /**
   * State for loading successful.
   */
  FINISHED = 'finished',

  /**
   * State for loading failure.
   */
  ERROR = 'error',
}

/**
 * Lnline loading spinner.
 */
@customElement(`${prefix}-inline-loading`)
class BXInlineLoading extends LitElement {
  /**
   * @returns The template for the status icon.
   */
  private _renderIcon() {
    const { status } = this;
    if (status === INLINE_LOADING_STATE.ERROR) {
      return Error20({
        class: `${prefix}--inline-loading--error`,
      });
    }
    if (status === INLINE_LOADING_STATE.FINISHED) {
      return CheckmarkFilled16({
        class: `${prefix}--inline-loading__checkmark-container ${prefix}--inline-loading__svg`,
      });
    }
    if (status === INLINE_LOADING_STATE.INACTIVE || status === INLINE_LOADING_STATE.ACTIVE) {
      const classes = classMap({
        [`${prefix}--loading ${prefix}--loading--small`]: true,
        [`${prefix}--loading--stop`]: status === INLINE_LOADING_STATE.INACTIVE,
      });
      return html`
        <div class="${classes}">
          ${getLoadingIcon({ type: LOADING_TYPE.SMALL })}
        </div>
      `;
    }
    return undefined;
  }

  /**
   * The loading status. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  status = INLINE_LOADING_STATE.ACTIVE;

  connectedCallback() {
    if (!this.hasAttribute('aria-live')) {
      this.setAttribute('aria-live', 'assertive');
    }
    super.connectedCallback();
  }

  render() {
    const statusIconResult = this._renderIcon();
    const statusIconWrapperResult = !statusIconResult
      ? undefined
      : html`
          <div class="${prefix}--inline-loading__animation">
            ${statusIconResult}
          </div>
        `;
    return html`
      ${statusIconWrapperResult}
      <p class="${prefix}--inline-loading__text"><slot></slot></p>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXInlineLoading;
