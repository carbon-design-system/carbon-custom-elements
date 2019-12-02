/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from '@storybook/addon-actions';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { defaultStory as baseDefaultStory } from './multi-select-story';

export { default } from './multi-select-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-multi-select
      :disabled="disabled"
      :invalid="invalid"
      :light="light"
      :open="open"
      :clear-selection-label="clearSelectionLabel"
      :helper-text="helperText"
      :label-text="labelText"
      :toggle-label-closed="toggleLabelClosed"
      :toggle-label-open="toggleLabelOpen"
      :trigger-content="triggerContent"
      :type="type"
      :validity-message="validityMessage"
      @bx-multi-select-beingselected="handleBeforeSelected"
      @bx-multi-select-selected="handleSelected"
    >
      <bx-multi-select-item value="all">Option 1</bx-multi-select-item>
      <bx-multi-select-item value="cloudFoundry">Option 2</bx-multi-select-item>
      <bx-multi-select-item value="staging">Option 3</bx-multi-select-item>
      <bx-multi-select-item value="dea">Option 4</bx-multi-select-item>
      <bx-multi-select-item value="router">Option 5</bx-multi-select-item>
    </bx-multi-select>
  `,
  ...createVueBindingsFromProps(
    (({ disableSelection, ...rest }) => {
      const beforeSelectedAction = action('bx-multi-select-beingselected');
      return {
        ...rest,
        handleBeforeSelected: (event: CustomEvent) => {
          beforeSelectedAction(event);
          if (disableSelection) {
            event.preventDefault();
          }
        },
        handleSelected: action('bx-multi-select-selected'),
      };
    })(parameters?.props?.['bx-multi-select'])
  ),
});

defaultStory.story = baseDefaultStory.story;
