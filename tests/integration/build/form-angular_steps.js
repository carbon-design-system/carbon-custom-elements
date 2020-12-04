/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { setup: setupDevServer, teardown: teardownDevServer } = require('jest-dev-server');

const PORT = 8085;

describe('Angular form example', () => {
  beforeAll(async () => {
    const projectRoot = path.resolve(__dirname, '../../..');
    const src = path.resolve(projectRoot, 'examples/codesandbox/form/angular');
    const tmpDir = process.env.CCE_EXAMPLE_TMPDIR;
    await setupDevServer({
      command: [
        `cp -r ${src} ${tmpDir}/form-angular`,
        `node ${projectRoot}/tests/integration/replace-dependencies.js ${tmpDir}/form-angular/package.json`,
        `cd ${tmpDir}/form-angular`,
        'yarn install',
        `cross-env NODE_OPTIONS="--max-old-space-size=8192" yarn ng serve --port ${PORT}`,
      ].join(' && '),
      launchTimeout: Number(process.env.LAUNCH_TIMEOUT),
      port: PORT,
    });
    page.on('dialog', async dialog => {
      const message = dialog.message();
      await dialog.dismiss();
      await page.evaluate(content => {
        document.body.insertAdjacentHTML('beforeend', `<div>${content}</div>`);
      }, message);
    });
    await page.goto(`http://localhost:${PORT}`);
  }, Number(process.env.LAUNCH_TIMEOUT));

  it('should detect an invalid data', async () => {
    await expect(page).toFill('bx-input[name="username"]', 'john');
    await expect(page).toFill('bx-input[name="password"]', 'foo');
    await expect(page).toClick('bx-btn[kind="primary"]');
    await expect(page).toMatchElement('bx-input[name="password"][invalid]', { timeout: 2000 });
  });

  it('should submit the data once all data is valid', async () => {
    await expect(page).toFill('bx-input[name="username"]', 'john');
    await expect(page).toFill('bx-input[name="password"]', 'angular');
    await expect(page).toClick('bx-btn[kind="primary"]');
    await expect(page).toMatch('You submitted:', { timeout: 2000 });
  });

  afterAll(async () => {
    await teardownDevServer();
  });
});
