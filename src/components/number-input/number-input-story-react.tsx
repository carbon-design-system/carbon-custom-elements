/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXNumberInput from 'carbon-custom-elements/es/components-react/number-input/number-input';
// @ts-ignore
import BXFormItem from 'carbon-custom-elements/es/components-react/form/form-item';
import {
  defaultStory as baseDefaultStory,
  formItem as baseFormItem,
  withoutFormItemWrapper as baseWithoutFormItemWrapper,
} from './number-input-story';

export { default } from './number-input-story';

export const defaultStory = ({ parameters }) => {
  const { disabled, value, placeholder, invalid, mobile, min, max, step, light, onInput } = parameters?.props?.[
    'bx-number-input'
  ];
  return (
    <BXNumberInput
      disabled={disabled}
      invalid={invalid}
      value={value}
      placeholder={placeholder}
      onInput={onInput}
      mobile={mobile}
      min={min}
      max={max}
      step={step}
      light={light}
    />
  );
};

defaultStory.story = baseDefaultStory.story;

export const formItem = ({ parameters }) => {
  const { disabled, value, placeholder, invalid, mobile, min, max, step, light, onInput } = parameters?.props?.[
    'bx-number-input'
  ];
  return (
    <BXFormItem>
      <BXNumberInput
        value={value}
        placeholder={placeholder}
        onInput={onInput}
        disabled={disabled}
        invalid={invalid}
        mobile={mobile}
        min={min}
        max={max}
        step={step}
        light={light}>
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
      </BXNumberInput>
    </BXFormItem>
  );
};

formItem.story = baseFormItem.story;

export const withoutFormItemWrapper = ({ parameters }) => {
  const { disabled, value, placeholder, invalid, mobile, min, max, step, light, onInput } = parameters?.props?.[
    'bx-number-input'
  ];
  return (
    <BXNumberInput
      value={value}
      placeholder={placeholder}
      onInput={onInput}
      disabled={disabled}
      invalid={invalid}
      mobile={mobile}
      min={min}
      max={max}
      step={step}
      light={light}>
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </BXNumberInput>
  );
};

withoutFormItemWrapper.story = baseWithoutFormItemWrapper.story;
