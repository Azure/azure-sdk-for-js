// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Shim for DOM's window and navigator's language
interface Navigator {
  language: string;
}

interface Window {
  readonly navigator: Navigator;
}

declare let navigator: Navigator;
declare let self: Window;
