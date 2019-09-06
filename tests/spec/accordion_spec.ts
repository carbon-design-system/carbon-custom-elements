/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render, TemplateResult } from 'lit-html';
import EventManager from '../utils/event-manager';
import '../../src/components/accordion/accordion';
// Just importing the default export does not seem to run `customElements.define()`
/* eslint-disable import/no-duplicates */
import '../../src/components/accordion/accordion-item';
import BXAccordionItem from '../../src/components/accordion/accordion-item';
/* eslint-enable import/no-duplicates */

const template = ({ hasContent = true, open }: { hasContent?: boolean; open?: boolean } = {}) =>
  !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-accordion>
          <bx-accordion-item ?open="${open}">Foo</bx-accordion-item>
        </bx-accordion>
      `;

describe('bx-accordion', function() {
  describe('Toggling', function() {
    let item: BXAccordionItem | null;
    const events = new EventManager();

    beforeEach(async function() {
      render(template(), document.body);
      await Promise.resolve();
      item = document.body.querySelector('bx-accordion-item');
    });

    it('Should open and close the item', async function() {
      item!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(item!.open).toBe(true);

      item!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(item!.open).toBe(false);
    });

    it('Should have ESC key close the item', async function() {
      render(template({ open: true }), document.body);
      await Promise.resolve();
      item = document.body.querySelector('bx-accordion-item');

      const event = new CustomEvent('keydown', { bubbles: true, composed: true });
      item!.shadowRoot!.querySelector('button')!.dispatchEvent(Object.assign(event, { key: 'Escape' }));
      await Promise.resolve();
      expect(item!.open).toBe(false);
    });

    it('Should have legacy ESC key close the item', async function() {
      render(template({ open: true }), document.body);
      await Promise.resolve();
      item = document.body.querySelector('bx-accordion-item');

      const event = new CustomEvent('keydown', { bubbles: true, composed: true });
      item!.shadowRoot!.querySelector('button')!.dispatchEvent(Object.assign(event, { key: 'Esc' }));
      await Promise.resolve();
      expect(item!.open).toBe(false);
    });

    it('Should fire bx-accordion-item-beingtoggled/bx-accordion-item-toggled events upon opening', async function() {
      const spyBeforeToggle = jasmine.createSpy('before toggle');
      const spyAfterToggle = jasmine.createSpy('after toggle');
      events.on(item!, 'bx-accordion-item-beingtoggled', spyBeforeToggle);
      events.on(item!, 'bx-accordion-item-toggled', spyAfterToggle);
      item!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(spyBeforeToggle).toHaveBeenCalled();
      expect(spyAfterToggle).toHaveBeenCalled();
    });

    it('Should fire bx-accordion-item-beingtoggled/bx-accordion-item-toggled events upon closing', async function() {
      render(template({ open: true }), document.body);
      await Promise.resolve();
      item = document.body.querySelector('bx-accordion-item');
      const spyBeforeToggle = jasmine.createSpy('before toggle');
      const spyAfterToggle = jasmine.createSpy('after toggle');
      events.on(item!, 'bx-accordion-item-beingtoggled', spyBeforeToggle);
      events.on(item!, 'bx-accordion-item-toggled', spyAfterToggle);
      const event = new CustomEvent('keydown', { bubbles: true, composed: true });
      item!.shadowRoot!.querySelector('button')!.dispatchEvent(Object.assign(event, { key: 'Escape' }));
      await Promise.resolve();
      expect(spyBeforeToggle).toHaveBeenCalled();
      expect(spyAfterToggle).toHaveBeenCalled();
    });

    it('Should support preventing modal from being opened upon user gesture', async function() {
      const spyAfterToggle = jasmine.createSpy('after toggle');
      events.on(item!, 'bx-accordion-item-beingtoggled', event => {
        event.preventDefault();
      });
      events.on(item!, 'bx-accordion-item-toggled', spyAfterToggle);
      item!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(spyAfterToggle).not.toHaveBeenCalled();
    });

    it('Should support preventing modal from being closed upon user gesture', async function() {
      render(template({ open: true }), document.body);
      await Promise.resolve();
      item = document.body.querySelector('bx-accordion-item');
      const spyAfterToggle = jasmine.createSpy('after toggle');
      events.on(item!, 'bx-accordion-item-beingtoggled', event => {
        event.preventDefault();
      });
      events.on(item!, 'bx-accordion-item-toggled', spyAfterToggle);
      const event = new CustomEvent('keydown', { bubbles: true, composed: true });
      item!.shadowRoot!.querySelector('button')!.dispatchEvent(Object.assign(event, { key: 'Escape' }));
      await Promise.resolve();
      expect(spyAfterToggle).not.toHaveBeenCalled();
    });

    afterEach(function() {
      render(template({ hasContent: false }), document.body);
      events.reset();
    });
  });
});
