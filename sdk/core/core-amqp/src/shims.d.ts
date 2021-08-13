// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// d.ts shims provide types for things we use internally but are not part
// of amqp-common's surface area.

// Shim for DOM's window and navigator's onLine status
interface Navigator {
  onLine: boolean;
}
interface Window {
  readonly navigator: Navigator;
}
declare let navigator: Navigator;

declare let self: Window & typeof globalThis
