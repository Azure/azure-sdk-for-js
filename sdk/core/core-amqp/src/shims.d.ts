// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// d.ts shims provide types for things we use internally but are not part
// of amqp-common's surface area.

// Shim for DOM's window and navigator's onLine status
interface Navigator {
  onLine: boolean;
}
interface Window {
  readonly navigator: Navigator;
}
declare var navigator: Navigator;

declare var window: Window;
