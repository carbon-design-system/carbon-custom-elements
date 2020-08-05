/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import on from 'carbon-components/es/globals/js/misc/on';
import Handle from '../../globals/internal/handle';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { forEach } from '../../globals/internal/collection-helpers';
import BXHeaderMenuButton from './header-menu-button';
import BXSideNavMenu from './side-nav-menu';
import styles from './side-nav.scss';

const { prefix } = settings;

/**
 * Collapse modes of side nav.
 */
export enum SIDE_NAV_COLLAPSE_MODE {
  /**
   * Fixed mode.
   * In this mode, side nav is non-collapsible.
   */
  FIXED = 'fixed',

  /**
   * Rail mode.
   * In this mode, side nav can be collapsed to a narrower width ("rail" look) with a toggle button.
   */
  RAIL = 'rail',

  /**
   * Responsive mode.
   * In this mode, side nav sticks in wider screen, and can be completely collapsed with a toggle button in narrower screen.
   */
  RESPONSIVE = 'responsive',
}

/**
 * The usage purpose of side nav.
 */
export enum SIDE_NAV_USAGE_MODE {
  /**
   * Regular usage.
   */
  REGULAR = '',

  /**
   * To represent header nav.
   * In this mode, side nav is hidden when header nav is shown, and side nav is shown then header nav is hidden.
   * This mode can be used only with `SIDE_NAV_COLLAPSE_MODE.REGULAR`.
   */
  HEADER_NAV = 'header-nav',
}

/**
 * Side nav.
 * @element bx-side-nav
 */
@customElement(`${prefix}-side-nav`)
class BXSideNav extends HostListenerMixin(LitElement) {
  /**
   * The handle for the listener of `${prefix}-header-menu-button-toggled` event.
   */
  private _hAfterButtonToggle: Handle | null = null;

  /**
   * `true` if this side nav is hovered.
   */
  private _hovered = false;

  /**
   * Handles `${prefix}-header-menu-button-toggle` event on the document.
   */
  private _handleButtonToggle(event: CustomEvent) {
    this.expanded = event.detail.active;
    if (this.expanded) {
      (this.querySelector((this.constructor as typeof BXSideNav).selectorNavItems) as HTMLElement)?.focus();
    }
  }

  /**
   * Force child side nav menus collapsed upon the hover/expanded state of this side nav.
   */
  private _updatedSideNavMenuForceCollapsedState() {
    const { expanded, _hovered: hovered } = this;
    forEach(this.querySelectorAll((this.constructor as typeof BXSideNav).selectorMenu), item => {
      (item as BXSideNavMenu).forceCollapsed = !expanded && !hovered;
    });
  }

  /**
   * Handles `mouseover` event handler.
   */
  @HostListener('mouseover')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleMouseover() {
    this._hovered = true;
    this._updatedSideNavMenuForceCollapsedState();
  }

  /**
   * Handles `mouseout` event handler.
   */
  @HostListener('mouseout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleMouseout() {
    this._hovered = false;
    this._updatedSideNavMenuForceCollapsedState();
  }

  /**
   * Collapse mode of the side nav.
   */
  @property({ reflect: true, attribute: 'collapse-mode' })
  collapseMode = SIDE_NAV_COLLAPSE_MODE.RESPONSIVE;

  /**
   * `true` to expand the side nav.
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /**
   * Usage mode of the side nav.
   */
  @property({ reflect: true, attribute: 'usage-mode' })
  usageMode = SIDE_NAV_USAGE_MODE.REGULAR;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'navigation');
    }
    super.connectedCallback();
    // Manually hooks the event listeners on the host element to make the event names configurable
    this._hAfterButtonToggle = on(
      this.getRootNode() as Document,
      (this.constructor as typeof BXSideNav).eventButtonToggle,
      this._handleButtonToggle.bind(this) as EventListener
    );
  }

  disconnectedCallback() {
    if (this._hAfterButtonToggle) {
      this._hAfterButtonToggle = this._hAfterButtonToggle.release();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('collapseMode') || changedProperties.has('usageMode')) {
      const { collapseMode, usageMode } = this;
      if (
        (collapseMode === SIDE_NAV_COLLAPSE_MODE.FIXED || collapseMode === SIDE_NAV_COLLAPSE_MODE.RAIL) &&
        usageMode === SIDE_NAV_USAGE_MODE.HEADER_NAV
      ) {
        console.warn('Fixed/rail modes of side nav cannot be used with header nav mode.'); // eslint-disable-line no-console
      }
    }
    const doc = this.getRootNode() as Document;
    if (changedProperties.has('collapseMode')) {
      forEach(doc.querySelectorAll((this.constructor as typeof BXSideNav).selectorButtonToggle), item => {
        (item as BXHeaderMenuButton).collapseMode = this.collapseMode;
      });
    }
    if (changedProperties.has('expanded')) {
      this._updatedSideNavMenuForceCollapsedState();
      forEach(doc.querySelectorAll((this.constructor as typeof BXSideNav).selectorButtonToggle), item => {
        (item as BXHeaderMenuButton).active = this.expanded;
      });
    }
    if (changedProperties.has('usageMode')) {
      forEach(doc.querySelectorAll((this.constructor as typeof BXSideNav).selectorButtonToggle), item => {
        (item as BXHeaderMenuButton).usageMode = this.usageMode;
      });
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  /**
   * A selector that will return the toggle buttons.
   */
  static get selectorButtonToggle() {
    return `${prefix}-header-menu-button`;
  }

  /**
   * A selector that will return side nav focusable items.
   */
  static get selectorNavItems() {
    return `${prefix}-side-nav-menu, ${prefix}-side-nav-menu-item, ${prefix}-side-nav-link`;
  }

  /**
   * A selector that will return side nav menus.
   */
  static get selectorMenu() {
    return `${prefix}-side-nav-menu`;
  }

  /**
   * The name of the custom event fired after the header menu button in the document is toggled upon a user gesture.
   */
  static get eventButtonToggle() {
    return `${prefix}-header-menu-button-toggled`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXSideNav;
