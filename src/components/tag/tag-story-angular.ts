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
import baseStory, { defaultStory as baseDefaultStory, filter as baseFilter } from './tag-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-tag [type]="type" [title]="title" [disabled]="disabled">
      This is not a tag
    </bx-tag>
  `,
  props: parameters?.props?.['bx-tag'],
});

defaultStory.story = baseDefaultStory.story;

export const filter = ({ parameters }) => ({
  template: `
    <bx-filter-tag
      [type]="type"
      [title]="title"
      [disabled]="disabled"
      (click)="onClick($event)"
    >
      This is not a tag
    </bx-filter-tag>
  `,
  props: parameters?.props?.['bx-filter-tag'],
});

filter.story = baseFilter.story;

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
