/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Fade16 from '@carbon/icons-vue/es/fade/16';
import contentStyles from 'carbon-components/scss/components/ui-shell/_content.scss';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { sideNav as baseSideNav, sideNavWithIcons as baseSideNavWithIcons } from './ui-shell-story';
import styles from './ui-shell-story.scss';

export { default } from './ui-shell-story';

const injectContentStyle = () => {
  const found = document.querySelector('style#ui-shell-content');
  if (!found) {
    const style = document.createElement('style');
    style.textContent = contentStyles.cssText;
    document.head.appendChild(style);
  }
};

const injectStoryStyle = () => {
  const found = document.querySelector('style#ui-shell-story');
  if (!found) {
    const style = document.createElement('style');
    style.textContent = styles.cssText;
    document.head.appendChild(style);
  }
};

const storyContent = () => `
  <main class="bx--content bx-ce-demo-devenv--ui-shell-content">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--offset-lg-3 bx--col-lg-13">
          <h2>
            Purpose and function
          </h2>
          <p>
            The shell is perhaps the most crucial piece of any UI built with Carbon. It contains the shared navigation framework
            for the entire design system and ties the products in IBM’s portfolio together in a cohesive and elegant way. The
            shell is the home of the topmost navigation, where users can quickly and dependably gain their bearings and move
            between pages.
            <br />
            <br />
            The shell was designed with maximum flexibility built in, to serve the needs of a broad range of products and users.
            Adopting the shell ensures compliance with IBM design standards, simplifies development efforts, and provides great
            user experiences. All IBM products built with Carbon are required to use the shell’s header.
            <br />
            <br />
            To better understand the purpose and function of the UI shell, consider the “shell” of MacOS, which contains the Apple
            menu, top-level navigation, and universal, OS-level controls at the top of the screen, as well as a universal dock
            along the bottom or side of the screen. The Carbon UI shell is roughly analogous in function to these parts of the Mac
            UI. For example, the app switcher portion of the shell can be compared to the dock in MacOS.
          </p>
          <h2>
            Header responsive behavior
          </h2>
          <p>
            As a header scales down to fit smaller screen sizes, headers with persistent side nav menus should have the side nav
            collapse into “hamburger” menu. See the example to better understand responsive behavior of the header.
          </p>
          <h2>
            Secondary navigation
          </h2>
          <p>
            The side-nav contains secondary navigation and fits below the header. It can be configured to be either fixed-width or
            flexible, with only one level of nested items allowed. Both links and category lists can be used in the side-nav and
            may be mixed together. There are several configurations of the side-nav, but only one configuration should be used per
            product section. If tabs are needed on a page when using a side-nav, then the tabs are secondary in hierarchy to the
            side-nav.
          </p>
        </div>
      </div>
    </div>
  </main>
`;

export const sideNav = ({ parameters }) => ({
  template: `
    <div>
      <bx-side-nav aria-label="Side navigation" :expanded="expanded" :fixed="fixed">
        <bx-side-nav-items>
          <bx-side-nav-menu title="L0 menu">
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
          </bx-side-nav-menu>
          <bx-side-nav-menu title="L0 menu">
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
            <bx-side-nav-menu-item active aria-current="page" :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
          </bx-side-nav-menu>
          <bx-side-nav-menu title="L0 menu">
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
          </bx-side-nav-menu>
          <bx-side-nav-link href="javascript:void(0)">L0 link</bx-side-nav-link>
          <bx-side-nav-link href="javascript:void(0)">L0 link</bx-side-nav-link>
        </bx-side-nav-items>
      </bx-side-nav>
      ${storyContent()}
    </div>
  `,
  ...createVueBindingsFromProps({
    ...parameters?.props?.['bx-side-nav'],
    ...parameters?.props?.['bx-side-nav-menu-item'],
  }),
  created() {
    injectContentStyle();
  },
});

sideNav.story = baseSideNav.story;

export const sideNavWithIcons = ({ parameters }) => ({
  template: `
  <div>
    <bx-side-nav aria-label="Side navigation" :expanded="expanded" :fixed="fixed">
      <bx-side-nav-items>
        <bx-side-nav-menu title="L0 menu">
          <fade-16 slot="title-icon"></fade-16>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-menu title="L0 menu">
          <fade-16 slot="title-icon"></fade-16>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item active aria-current="page" :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-menu title="L0 menu">
          <fade-16 slot="title-icon"></fade-16>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-link href="javascript:void(0)">
          <fade-16 slot="title-icon"></fade-16>
          L0 link
        </bx-side-nav-link>
        <bx-side-nav-link href="javascript:void(0)">
          <fade-16 slot="title-icon"></fade-16>
          L0 link
        </bx-side-nav-link>
      </bx-side-nav-items>
    </bx-side-nav>
    ${storyContent()}
  </div>
  `,
  components: {
    'fade-16': Fade16,
  },
  ...createVueBindingsFromProps({
    ...parameters?.props?.['bx-side-nav'],
    ...parameters?.props?.['bx-side-nav-menu-item'],
  }),
  created() {
    injectContentStyle();
  },
});

sideNavWithIcons.story = baseSideNavWithIcons.story;

export const header = ({ parameters }) => ({
  template: `
    <div>
      <bx-header aria-label="IBM Platform Name">
        <bx-header-menu-button button-label-active="Close menu" button-label-inactive="Open menu"></bx-header-menu-button>
        <bx-header-name href="javascript:void 0" prefix="IBM">[Platform]</bx-header-name>
        <bx-header-nav menu-bar-label="IBM [Platform]">
          <bx-header-nav-item href="javascript:void 0">Link 1</bx-header-nav-item>
          <bx-header-nav-item href="javascript:void 0">Link 2</bx-header-nav-item>
          <bx-header-nav-item href="javascript:void 0">Link 3</bx-header-nav-item>
          <bx-header-menu menu-label="Link 4" trigger-content="Link 4">
            <bx-header-menu-item href="javascript:void 0">Sub-link 1</bx-header-menu-item>
            <bx-header-menu-item href="javascript:void 0">Sub-link 2</bx-header-menu-item>
            <bx-header-menu-item href="javascript:void 0">Sub-link 3</bx-header-menu-item>
          </bx-header-menu>
        </bx-header-nav>
      </bx-header>
      <bx-side-nav aria-label="Side navigation" :expanded="expanded" :fixed="fixed">
        <bx-side-nav-items>
          <bx-side-nav-menu title="L0 menu">
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
          </bx-side-nav-menu>
          <bx-side-nav-menu title="L0 menu">
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
            <bx-side-nav-menu-item active aria-current="page" :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
          </bx-side-nav-menu>
          <bx-side-nav-menu title="L0 menu">
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
            <bx-side-nav-menu-item :href="href">
              L0 menu item
            </bx-side-nav-menu-item>
          </bx-side-nav-menu>
          <bx-side-nav-link href="javascript:void(0)">L0 link</bx-side-nav-link>
          <bx-side-nav-link href="javascript:void(0)">L0 link</bx-side-nav-link>
        </bx-side-nav-items>
      </bx-side-nav>
      ${storyContent()}
    </div>
  `,
  ...createVueBindingsFromProps({
    ...parameters?.props?.['bx-side-nav'],
    ...parameters?.props?.['bx-side-nav-menu-item'],
  }),
  created() {
    injectContentStyle();
    injectStoryStyle();
  },
});
