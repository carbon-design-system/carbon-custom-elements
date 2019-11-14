/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classnames from 'classnames';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, query, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import FocusMixin from '../../globals/mixins/focus';
import FormMixin from '../../globals/mixins/form';
import styles from './checkbox.scss';

const { prefix } = settings;

/**
 * Check box.
 */
@customElement(`${prefix}-checkbox`)
class BXCheckbox extends FocusMixin(FormMixin(LitElement)) {
  @query('input')
  protected _checkboxNode!: HTMLInputElement;

  /**
   * Handles `click` event on the `<input>` in the shadow DOM.
   */
  protected _handleChange() {
    const { checked, indeterminate } = this._checkboxNode;
    this.checked = checked;
    this.indeterminate = indeterminate;
  }

  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { checked, disabled, name, value = 'on' } = this;
    if (!disabled && checked) {
      formData.append(name, value);
    }
  }

  /**
   * `true` if the check box should be checked. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

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
   * `true` if the check box should show its UI of the indeterminate state. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * The label text. Corresponds to `label-text` attribute.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * The form name. Corresponds to the attribute with the same name.
   */
  @property()
  name!: string;

  /**
   * The value. Corresponds to the attribute with the same name.
   */
  @property()
  value!: string;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { checked, disabled, hideLabel, indeterminate, labelText, name, value, _handleChange: handleChange } = this;
    const labelClasses = classnames(`${prefix}--checkbox-label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
    });
    return html`
      <input
        id="checkbox"
        type="checkbox"
        class="${`${prefix}--checkbox`}"
        aria-checked="${indeterminate ? 'mixed' : String(Boolean(checked))}"
        .checked="${checked}"
        ?disabled="${disabled}"
        .indeterminate="${indeterminate}"
        name="${ifDefined(name == null ? undefined : name)}"
        value="${ifDefined(value == null ? undefined : value)}"
        @change="${handleChange}"
      />
      <label for="checkbox" class="${labelClasses}"><slot>${labelText}</slot></label>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXCheckbox;
