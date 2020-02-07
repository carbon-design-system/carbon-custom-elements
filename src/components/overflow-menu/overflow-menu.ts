/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { html, property, customElement, LitElement } from 'lit-element';
import OverflowMenuVertical16 from '@carbon/icons/lib/overflow-menu--vertical/16';
import HostListener from '../../globals/decorators/host-listener';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { find } from '../../globals/internal/collection-helpers';
import BXFloatingMenu from '../floating-menu/floating-menu';
import BXFloatingMenuTrigger from '../floating-menu/floating-menu-trigger';
import styles from './overflow-menu.scss';

const { prefix } = settings;

/**
 * Overflow menu.
 * @element bx-overflow-menu
 * @slot icon - The icon for the trigger button.
 */
@customElement(`${prefix}-overflow-menu`)
class BXOverflowMenu extends HostListenerMixin(FocusMixin(LitElement)) implements BXFloatingMenuTrigger {
  /**
   * The menu body.
   */
  private _menuBody: BXFloatingMenu | null = null;

  /**
   * Handles user-initiated toggling of the menu.
   */
  private async _handleUserInitiatedToggle() {
    this.open = !this.open;
    const { open, updateComplete } = this;
    if (open) {
      await updateComplete;
      const { _menuBody: menuBody } = this;
      menuBody?.focus();
    }
  }

  /**
   * Handles `click` event on the trigger button.
   */
  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClickTrigger = async () => {
    this._handleUserInitiatedToggle();
  };

  /**
   * Handles `keydown` event on the trigger button.
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydownTrigger = async ({ key }) => {
    if (key === ' ' || key === 'Enter') {
      this._handleUserInitiatedToggle();
    }
  };

  /**
   * `true` if the dropdown should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * @returns The position of the trigger button in the viewport.
   */
  get triggerPosition() {
    return this.getBoundingClientRect();
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    if (!this.hasAttribute('tabindex')) {
      // TODO: Should we use a property?
      this.setAttribute('tabindex', '0');
    }
    if (!this.hasAttribute('aria-haspopup')) {
      this.setAttribute('aria-haspopup', 'true');
    }
    if (!this.hasAttribute('aria-expanded')) {
      this.setAttribute('aria-expanded', 'false');
    }
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      const { open } = this;
      if (open && !this._menuBody) {
        this._menuBody = find(this.childNodes, elem => (elem.constructor as typeof BXFloatingMenu).FLOATING_MENU);
      }
      const { _menuBody: menuBody } = this;
      if (menuBody) {
        menuBody.open = open;
        this.setAttribute('aria-expanded', String(Boolean(open)));
      }
    }
  }

  render() {
    return html`
      <slot name="icon">
        ${OverflowMenuVertical16({
          class: `${prefix}--overflow-menu__icon`,
        })}
      </slot>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXOverflowMenu;
