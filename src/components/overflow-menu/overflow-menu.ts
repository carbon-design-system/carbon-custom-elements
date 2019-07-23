import settings from 'carbon-components/es/globals/js/settings';
import { property, customElement, LitElement } from 'lit-element';
import OverflowMenuVertical16 from '@carbon/icons/lib/overflow-menu--vertical/16';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { find } from '../../globals/internal/collection-helpers';
import BXFloatingMenu from '../floating-menu/floating-menu';
import BXFloatingMenuTrigger from '../floating-menu/floating-menu-trigger';
import styles from './overflow-menu.scss';

const { prefix } = settings;

/**
 * Overflow menu.
 */
@customElement(`${prefix}-overflow-menu` as any)
class BXOverflowMenu extends HostListenerMixin(LitElement) implements BXFloatingMenuTrigger {
  /**
   * The menu body.
   */
  private _menuBody: BXFloatingMenu | null = null;

  /**
   * Handles `click` event on the trigger button.
   */
  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClickTrigger = (event: MouseEvent) => {
    if (event.composedPath().indexOf(this.shadowRoot!) >= 0) {
      this.open = !this.open;
    }
  };

  /**
   * `true` if the dropdown should be open. Corresponds to the attribute with the same name.
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

  attributeChangedCallback(name, old, current) {
    if (old !== current) {
      if (name === 'open' && !this._menuBody) {
        this._menuBody = find(this.childNodes, elem => (elem.constructor as typeof BXFloatingMenu).FLOATING_MENU);
      }
      if (this._menuBody) {
        this._menuBody.open = this.open;
      }
      this.setAttribute('aria-expanded', String(Boolean(this.open)));
    }
    super.attributeChangedCallback(name, old, current);
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    return OverflowMenuVertical16({
      class: `${prefix}--overflow-menu__icon`,
    });
  }

  /**
   * The CSS selector to find the trigger button.
   */
  static selectorTrigger = '#trigger';

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXOverflowMenu;
