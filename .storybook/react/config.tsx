/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../src/polyfills';
import React, { StrictMode } from 'react';
import addons from '@storybook/addons';
import { configure, addDecorator, addParameters } from '@storybook/react'; // eslint-disable-line import/first
import { withKnobs } from '@storybook/addon-knobs';
import '../components/focus-trap/focus-trap';
import { CURRENT_THEME } from '../addon-carbon-theme/shared';
import theme from './theme';
import containerStyles from '../_container.scss'; // eslint-disable-line import/first

if (process.env.STORYBOOK_CARBON_CUSTOM_ELEMENTS_USE_RTL === 'true') {
  document.documentElement.setAttribute('dir', 'rtl');
}

const SORT_ORDER = ['introduction-welcome--page', 'introduction-form-paticipation--page'];

addParameters({
  options: {
    showRoots: true,
    storySort(lhs, rhs) {
      const [lhsId] = lhs;
      const [rhsId] = rhs;
      const lhsSortOrder = SORT_ORDER.indexOf(lhsId);
      const rhsSortOrder = SORT_ORDER.indexOf(rhsId);
      if (lhsSortOrder >= 0 && rhsSortOrder >= 0) {
        return lhsSortOrder - rhsSortOrder;
      }
      return 0;
    },
    theme: theme,
  },
});

addDecorator(withKnobs);

addDecorator((story, { parameters }) => {
  const { knobs } = parameters;
  if (Object(knobs) === knobs) {
    if (!parameters.props) {
      parameters.props = {};
    }
    Object.keys(knobs).forEach(name => {
      if (typeof knobs[name] === 'function') {
        parameters.props[name] = knobs[name]();
      }
    });
  }
  return story();
});

addDecorator(story => (
  <StrictMode>
    <style>{containerStyles.cssText}</style>
    <bx-ce-demo-focus-trap href="#main-content" aria-label="Skip to main content">
      Skip to main content
    </bx-ce-demo-focus-trap>
    <div id="main-content" data-floating-menu-container role="main" className="bx--body bx-ce-demo-devenv--container">
      {story()}
    </div>
    <bx-ce-demo-focus-trap href="#main-content" aria-label="End of content">
      End of content
    </bx-ce-demo-focus-trap>
  </StrictMode>
));

addons.getChannel().on(CURRENT_THEME, theme => {
  document.documentElement.setAttribute('storybook-carbon-theme', theme);
});

const reqDocs = require.context('../../docs', true, /\-story\-react\.mdx$/);
configure(reqDocs, module);

const reqComponents = require.context('../../src/components', true, /\-story\-react\.[jt]sx$/);
configure(reqComponents, module);

if (module.hot) {
  module.hot.accept(reqComponents.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, '', currentLocationHref);
    window.location.reload();
  });
}
