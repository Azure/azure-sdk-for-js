// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// React Native's type definitions do not include TextDecoder,
// but it is available at runtime in the Hermes engine.
declare global {
  interface TextDecoder {
    decode(input?: ArrayBufferView | ArrayBuffer, options?: any): string;
  }
  // eslint-disable-next-line no-var
  var TextDecoder: {
    prototype: TextDecoder;
    new (label?: string, options?: any): TextDecoder;
  };
}

export * from "./indexPlatform-browser.mjs";
