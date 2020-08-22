/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Add16 from '@carbon/icons-vue/es/add/16';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import {
  Default as baseDefault,
  icon as baseIcon,
  textAndIcon as baseTextAndIcon,
  skeleton as baseSkeleton,
} from './button-story';

export { default } from './button-story';

export const Default = (_, { parameters }) => ({
  template: `
    <bx-btn :kind="kind" :disabled="disabled" :size="size" :href="href" @click="onClick">Button</bx-btn>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-btn']),
});

Object.assign(Default, baseDefault);

export const icon = (_, { parameters }) => ({
  template: `
    <bx-btn :kind="kind" :disabled="disabled" :size="size" :href="href" @click="onClick">
      <add-16 slot="icon"></add-16>
    </bx-btn>
  `,
  components: {
    'add-16': Add16,
  },
  ...createVueBindingsFromProps(parameters?.props?.['bx-btn']),
});

Object.assign(icon, baseIcon);

export const textAndIcon = (_, { parameters }) => ({
  template: `
    <bx-btn :kind="kind" :disabled="disabled" :size="size" :href="href" :icon-layout="iconLayout" @click="onClick">
      Button <add-16 slot="icon"></add-16>
    </bx-btn>
  `,
  components: {
    'add-16': Add16,
  },
  ...createVueBindingsFromProps(parameters?.props?.['bx-btn']),
});

Object.assign(textAndIcon, baseTextAndIcon);

export const skeleton = (_, { parameters }) => ({
  template: `
    <bx-btn-skeleton :disabled="disabled" :small="small" :href="href" @click="onClick"></bx-btn-skeleton>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-btn-skeleton']),
});

Object.assign(skeleton, baseSkeleton);
