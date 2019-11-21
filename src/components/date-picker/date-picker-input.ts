/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classnames from 'classnames';
import { html, property, query, customElement, LitElement } from 'lit-element';
import Calendar16 from '@carbon/icons/lib/calendar/16';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from '../../globals/directives/if-non-null';
import FocusMixin from '../../globals/mixins/focus';
import styles from './date-picker.scss';

const { prefix } = settings;

/**
 * Date picker input kinds.
 */
export enum DATE_PICKER_INPUT_KIND {
  /**
   * One for simple variant of date picker, comes without the calendar dropdown.
   */
  SIMPLE = 'simple',

  /**
   * One for single variant of date picker.
   */
  SINGLE = 'single',

  /**
   * One for the start date for the range variant.
   */
  FROM = 'from',

  /**
   * One for the end date for the range variant.
   */
  TO = 'to',
}

/**
 * The input box for date picker.
 */
@customElement(`${prefix}-date-picker-input`)
class BXDatePickerInput extends FocusMixin(LitElement) {
  /**
   * The `<slot>` for the validity message.
   */
  @query('slot[name="validity-message"]')
  private _slotValidityMessage!: HTMLSlotElement;

  /**
   * `true` if validity message is given via `validityMessage` property or via `<slot name="validity-message">`.
   */
  private get _hasValidityMessage() {
    const { validityMessage, _slotValidityMessage: slotValidityMessage } = this;
    return validityMessage || (slotValidityMessage && slotValidityMessage.assignedNodes.length > 0);
  }

  /**
   * Handles `slotchange` event on `<slot name="validity-message">`.
   */
  private _handleSlotChangeValidityMessage() {
    this.requestUpdate();
  }

  /**
   * Handles `input` event on `<input>` in the shadow DOM.
   * @param event The event.
   */
  private _handleInput({ target }: Event) {
    const { value } = target as HTMLInputElement;
    this.value = value;
  }

  /**
   * @returns The template for the the calendar icon.
   */
  private _renderIcon() {
    return this.kind === DATE_PICKER_INPUT_KIND.SIMPLE
      ? undefined
      : Calendar16({
          class: `${prefix}--date-picker__icon`,
          role: 'img',
          children: [
            html`
              <title>Open calendar</title>
            `,
          ],
        });
  }

  /**
   * @returns The template for the the validity message.
   */
  private _renderValidityMessage() {
    const {
      validityMessage,
      _hasValidityMessage: hasValidityMessage,
      _handleSlotChangeValidityMessage: handleSlotChangeValidityMessage,
    } = this;
    return html`
      <div ?hidden="${!hasValidityMessage}" class="${prefix}--form-requirement">
        <slot name="validity-message" @slotchange="${handleSlotChangeValidityMessage}">${validityMessage}</slot>
      </div>
    `;
  }

  /**
   * The `<input>`, used for Flatpickr to grab.
   */
  @query('input')
  input!: HTMLInputElement;

  /**
   * `true` if the check box should be disabled. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if the label should be hidden. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  /**
   * Date picker input kind. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  kind = DATE_PICKER_INPUT_KIND.SIMPLE;

  /**
   * The label text. Corresponds to `label-text` attribute.
   */
  @property({ attribute: 'label-text' })
  labelText!: string;

  /**
   * `true` if this date picker input should use the light UI variant. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  light = false;

  /**
   * The `pattern` attribute for the `<input>` in the shadow DOM. Corresponds to the attribute with the same name.
   */
  @property()
  pattern!: string;

  /**
   * The placeholder text. Corresponds to the attribute with the same name.
   */
  @property()
  placeholder!: string;

  /**
   * `true` if this date picker input should use the short UI variant.
   * Effective only when `kind` property is `DATE_PICKER_INPUT_KIND.SIMPLE`.
   * Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  short = false;

  /**
   * The `type` attribute for the `<input>` in the shadow DOM. Corresponds to the attribute with the same name.
   */
  @property()
  type!: string;

  /**
   * The validity message. Corresponds to `validity-message` attribute.
   * If present and non-empty, this date picker input shows the UI of its invalid state.
   */
  @property({ attribute: 'validity-message' })
  validityMessage = '';

  /**
   * The value. Corresponds to the attribute with the same name.
   */
  @property()
  value!: string;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const constructor = this.constructor as typeof BXDatePickerInput;
    const {
      disabled,
      hideLabel,
      labelText,
      pattern = constructor.defaultPattern,
      placeholder,
      type = constructor.defaultType,
      validityMessage,
      value,
      _handleInput: handleInput,
    } = this;
    const hasValidity = Boolean(validityMessage);
    const labelClasses = classnames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: disabled,
    });
    return html`
      <label for="input" class="${labelClasses}">
        <slot name="label-text">${labelText}</slot>
      </label>
      <div class="${prefix}--date-picker-input__wrapper">
        <input
          id="input"
          type="${type}"
          class="${prefix}--date-picker__input"
          ?disabled="${disabled}"
          pattern="${pattern}"
          placeholder="${ifNonNull(placeholder)}"
          .value="${ifNonNull(value)}"
          ?data-invalid="${hasValidity}"
          @input="${handleInput}"
        />
        ${this._renderIcon()}
      </div>
      ${this._renderValidityMessage()}
    `;
  }

  /**
   * The default value for `pattern` property.
   */
  static defaultPattern = '\\d{1,2}\\/\\d{1,2}\\/\\d{4}';

  /**
   * The default value for `type` property.
   */
  static defaultType = 'text';

  /**
   * A selector that will return the parent date picker.
   */
  static get selectorParent() {
    return `${prefix}-date-picker`;
  }

  static styles = styles;
}

export default BXDatePickerInput;
