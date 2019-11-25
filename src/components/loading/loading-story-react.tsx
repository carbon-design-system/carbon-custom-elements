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
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXLoading from 'carbon-custom-elements/es/components-react/loading/loading';
import { defaultStory as baseDefaultStory } from './loading-story';

export { default } from './loading-story';

export const defaultStory = ({ parameters }) => {
  const props = parameters?.props['bx-loading'];
  return <BXLoading inactive={props.inactive} type={props.type} />;
};

defaultStory.story = baseDefaultStory.story;
