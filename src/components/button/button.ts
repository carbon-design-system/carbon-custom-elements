/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement } from 'lit-element';
import ifNonNull from '../../globals/directives/if-non-null';
import FocusMixin from '../../globals/mixins/focus';
import styles from './button.scss';

const { prefix } = settings;

/**
 * Button kinds.
 */
export enum BUTTON_KIND {
  /**
   * Primary button.
   */
  PRIMARY = 'primary',

  /**
   * Secondary button.
   */
  SECONDARY = 'secondary',

  /**
   * Danger button.
   */
  DANGER = 'danger',

  /**
   * Ghost button.
   */
  GHOST = 'ghost',
}

/**
 * Button size.
 */
export enum BUTTON_SIZE {
  /**
   * Regular size.
   */
  REGULAR = '',

  /**
   * Small size.
   */
  SMALL = 'sm',

  /**
   * Size for form field.
   */
  FIELD = 'field',
}

/**
 * Button.
 * @element bx-btn
 */
@customElement(`${prefix}-btn`)
class BXButton extends FocusMixin(LitElement) {
  /**
   * `true` if there is an icon.
   */
  private _hasIcon = false;

  /**
   * `true` if there is a non-icon content.
   */
  private _hasMainContent = false;

  /**
   * Handles `click` event on the `<a>.
   * @param event The event.
   */
  private _handleClickLink(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault(); // Stop following the link
      event.stopPropagation(); // Stop firing `onClick`
    }
  }

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[name === 'icon' ? '_hasIcon' : '_hasMainContent'] = hasContent;
    this.requestUpdate();
  }

  /**
   * `true` if the button should have input focus when the page loads.
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * `true` if the button should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The default file name, used if this button is rendered as `<a>`.
   */
  @property()
  download!: string;

  /**
   * Link `href`. If present, this button is rendered as `<a>`.
   */
  @property()
  href!: string;

  /**
   * The language of what `href` points to, if this button is rendered as `<a>`.
   */
  @property()
  hreflang!: string;

  /**
   * Button kind.
   */
  @property({ reflect: true })
  kind = BUTTON_KIND.PRIMARY;

  /**
   * URLs to ping, if this button is rendered as `<a>`.
   */
  @property()
  ping!: string;

  /**
   * The link type, if this button is rendered as `<a>`.
   */
  @property()
  rel!: string;

  /**
   * Button size.
   */
  @property({ reflect: true })
  size = BUTTON_SIZE.REGULAR;

  /**
   * The link target, if this button is rendered as `<a>`.
   */
  @property()
  target!: string;

  /**
   * The default behavior if the button is rendered as `<button>`. MIME type of the `target`if this button is rendered as `<a>`.
   */
  @property()
  type!: string;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const {
      autofocus,
      disabled,
      download,
      href,
      hreflang,
      kind,
      ping,
      rel,
      size,
      target,
      type,
      _hasIcon: hasIcon,
      _hasMainContent: hasMainContent,
      _handleSlotChange: handleSlotChange,
    } = this;
    const classes = classMap({
      [`${prefix}--btn`]: true,
      [`${prefix}--btn--${kind}`]: kind,
      [`${prefix}--btn--disabled`]: disabled,
      [`${prefix}--btn--icon-only`]: hasIcon && !hasMainContent,
      [`${prefix}--btn--${size}`]: size,
      [`${prefix}-ce--btn--has-icon`]: hasIcon,
    });
    return href
      ? html`
          <a
            id="button"
            role="button"
            class="${classes}"
            download="${ifNonNull(download)}"
            href="${ifNonNull(href)}"
            hreflang="${ifNonNull(hreflang)}"
            ping="${ifNonNull(ping)}"
            rel="${ifNonNull(rel)}"
            target="${ifNonNull(target)}"
            type="${ifNonNull(type)}"
            @click="${this._handleClickLink}"
          >
            <slot @slotchange="${handleSlotChange}"></slot>
            <slot name="icon" @slotchange="${handleSlotChange}"></slot>
          </a>
        `
      : html`
          <button id="button" class="${classes}" ?autofocus="${autofocus}" ?disabled="${disabled}" type="${ifNonNull(type)}">
            <slot @slotchange="${handleSlotChange}"></slot>
            <slot name="icon" @slotchange="${handleSlotChange}"></slot>
          </button>
        `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXButton;
