/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, property, query } from 'lit-element';
import classnames from 'classnames';
import settings from 'carbon-components/es/globals/js/settings';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import CaretUp16 from '@carbon/icons/lib/caret--up/16';
import CaretDown16 from '@carbon/icons/lib/caret--down/16';
import styles from './number-input.scss';
import BXInput from '../input/input';

const { prefix } = settings;

@customElement(`${prefix}-number-input`)
export default class BXNumberInput extends BXInput {
  @query('input')
  protected _input!: HTMLInputElement;

  /**
   * Handles incrementing the value in the input
   */
  protected _handleIncrement() {
    this._input.stepUp();
  }

  /**
   * Handles decrementing the value in the input
   */
  protected _handleDecrement() {
    this._input.stepDown();
  }

  protected _min = '';

  protected _max = '';

  @property({ type: Number, reflect: true })
  set min(value) {
    this._min = value;
  }

  get min() {
    return this._min.toString();
  }

  @property({ type: Number, reflect: true })
  set max(value) {
    this._max = value;
  }

  get max() {
    return this._max.toString();
  }

  @property({ type: Number, reflect: true })
  step = '1';

  @property({ type: Boolean, reflect: true })
  mobile = false;

  @property()
  incrementButtonLabel = 'increase number input';

  @property()
  decrementButtonLabel = 'decrease number input';

  @property({ type: Boolean, reflect: true })
  light = false;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { _handleInput: handleInput } = this;

    const invalidIcon = WarningFilled16({ class: `${prefix}--number__invalid` });

    const wrapperClasses = classnames(`${prefix}--number`, {
      [`${prefix}--number--light`]: this.light,
      [`${prefix}--number--mobile`]: this.mobile,
    });

    const labelClasses = classnames(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: this.disabled,
    });

    const helperTextClasses = classnames(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: this.disabled,
    });

    const incrementButton = html`
      <button
        class="${prefix}--number__control-btn up-icon"
        aria-label="${this.incrementButtonLabel}"
        aria-live="polite"
        aria-atomic="true"
        type="button"
        ?disabled=${this.disabled}
        @click=${this._handleIncrement}
      >
        ${CaretUp16()}
      </button>
    `;
    const decrementButton = html`
      <button
        class="${prefix}--number__control-btn down-icon"
        aria-label="${this.decrementButtonLabel}"
        aria-live="polite"
        aria-atomic="true"
        type="button"
        ?disabled=${this.disabled}
        @click=${this._handleDecrement}
      >
        ${CaretDown16()}
      </button>
    `;

    const input = html`
      <input
        ?autocomplete="${this.autocomplete}"
        ?autofocus="${this.autofocus}"
        ?data-invalid="${this.invalid}"
        ?disabled="${this.disabled}"
        id="input"
        name="${this.name}"
        pattern="${this.pattern}"
        placeholder="${this.placeholder}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        type="number"
        .value="${this.value}"
        @input="${handleInput}"
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        role="alert"
        aria-atomic="true"
      />
    `;

    const defaultLayout = html`
      ${this.invalid ? invalidIcon : null} ${input}
      <div class="${prefix}--number__controls">
        ${incrementButton} ${decrementButton}
      </div>
    `;

    const mobileLayout = html`
      ${decrementButton} ${input} ${incrementButton}
    `;

    return html`
      <div class="${wrapperClasses}" ?data-invalid=${this.invalid}>
        <label class="${labelClasses}" for="input">
          <slot name="label-text">
            ${this.labelText}
          </slot>
        </label>
        <div class="${helperTextClasses}">
          <slot name="helper-text">
            ${this.helperText}
          </slot>
        </div>
        <div class="${prefix}--number__input-wrapper">
          ${this.mobile ? mobileLayout : defaultLayout}
        </div>
        <div class="${prefix}--form-requirement">
          <slot name="validity-message">
            ${this.validityMessage}
          </slot>
        </div>
      </div>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}
