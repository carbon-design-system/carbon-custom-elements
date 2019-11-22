/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import baseStory, {
  defaultStory as baseDefaultStory,
  formItem as baseFormItem,
  withoutFormItemWrapper as baseWithoutFormItemWrapper,
} from './input-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-input
      [disabled]="disabled"
      [value]="value"
      [type]="type"
      [placeholder]="placeholder"
      [invalid]="invalid"
      (input)="onInput()"
    ></bx-input>
  `,
  props: parameters?.props['bx-input'],
});

defaultStory.story = baseDefaultStory.story;

export const formItem = ({ parameters }) => ({
  template: `
    <bx-form-item>
      <bx-input [value]="value" [placeholder]="placeholder" (input)="onInput()" [invalid]="invalid" [disabled]="disabled">
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
      </bx-input>
    </bx-form-item>
  `,
  props: parameters?.props['bx-input'],
});

formItem.story = baseFormItem.story;

export const withoutFormItemWrapper = ({ parameters }) => ({
  template: `
    <bx-input [value]="value" [placeholder]="placeholder" (input)="onInput()" [invalid]="invalid" [disabled]="disabled">
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </bx-input>
  `,
  props: parameters?.props['bx-input'],
});

withoutFormItemWrapper.story = baseWithoutFormItemWrapper.story;

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
