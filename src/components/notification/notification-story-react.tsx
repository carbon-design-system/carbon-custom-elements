/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
// prettier-ignore
// eslint-disable-next-line max-len
import BXInlineNotification from 'carbon-web-components/es/components-react/notification/inline-notification';
// @ts-ignore
import BXToastNotification from 'carbon-web-components/es/components-react/notification/toast-notification';
import { inline as baseInline, toast as baseToast } from './notification-story';

export { default } from './notification-story';

export const inline = (_, { parameters }) => {
  const {
    kind,
    title,
    subtitle,
    hideCloseButton,
    closeButtonLabel,
    iconLabel,
    open,
    disableClose,
    onBeforeClose,
    onClose,
  } = parameters?.props?.['bx-inline-notification'];
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return (
    <BXInlineNotification
      style={{ minWidth: '30rem', marginBottom: '.5rem' }}
      kind={kind}
      title={title}
      subtitle={subtitle}
      hideCloseButton={hideCloseButton}
      closeButtonLabel={closeButtonLabel}
      iconLabel={iconLabel}
      open={open}
      onBeforeClose={handleBeforeClose}
      onClose={onClose}
    />
  );
};

Object.assign(inline, baseInline);

export const toast = (_, { parameters }) => {
  const {
    kind,
    title,
    subtitle,
    caption,
    hideCloseButton,
    closeButtonLabel,
    iconLabel,
    open,
    disableClose,
    onBeforeClose,
    onClose,
  } = parameters?.props?.['bx-toast-notification'];
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return (
    <BXToastNotification
      style={{ minWidth: '30rem', marginBottom: '.5rem' }}
      kind={kind}
      title={title}
      subtitle={subtitle}
      caption={caption}
      hideCloseButton={hideCloseButton}
      closeButtonLabel={closeButtonLabel}
      iconLabel={iconLabel}
      open={open}
      onBeforeClose={handleBeforeClose}
      onClose={onClose}
    />
  );
};

Object.assign(toast, baseToast);
