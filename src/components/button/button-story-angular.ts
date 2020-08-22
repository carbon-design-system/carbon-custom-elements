/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import { Add16Module } from '@carbon/icons-angular/lib/add/16';
import baseStory, {
  Default as baseDefault,
  icon as baseIcon,
  textAndIcon as baseTextAndIcon,
  skeleton as baseSkeleton,
} from './button-story';

export const Default = (_, { parameters }) => ({
  template: `
    <bx-btn [kind]="kind" [disabled]="disabled" [size]="size" [href]="href" (click)="onClick($event)">Button</bx-btn>
  `,
  props: parameters?.props?.['bx-btn'],
});

Object.assign(Default, baseDefault);

export const icon = (_, { parameters }) => ({
  template: `
    <bx-btn [kind]="kind" [disabled]="disabled" [size]="size" [href]="href" (click)="onClick($event)">
      <ibm-icon-add16 slot="icon"></ibm-icon-add16>
    </bx-btn>
  `,
  props: parameters?.props?.['bx-btn'],
});

Object.assign(icon, baseIcon, {
  decorators: [
    moduleMetadata({
      imports: [Add16Module],
    }),
  ],
});

export const textAndIcon = (_, { parameters }) => ({
  template: `
    <bx-btn [kind]="kind" [disabled]="disabled" [size]="size" [href]="href" [iconLayout]="iconLayout" (click)="onClick($event)">
      Button <ibm-icon-add16 slot="icon"></ibm-icon-add16>
    </bx-btn>
  `,
  props: parameters?.props?.['bx-btn'],
});

Object.assign(textAndIcon, baseTextAndIcon, {
  decorators: [
    moduleMetadata({
      imports: [Add16Module],
    }),
  ],
});

export const skeleton = (_, { parameters }) => ({
  template: `
    <bx-btn-skeleton [disabled]="disabled" [small]="small" [href]="href" (click)="onClick($event)"></bx-btn-skeleton>
  `,
  props: parameters?.props?.['bx-btn-skeleton'],
});

Object.assign(skeleton, baseSkeleton);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
