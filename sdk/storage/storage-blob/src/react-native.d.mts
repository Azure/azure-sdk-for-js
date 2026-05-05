// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Hermes engine (React Native) provides these APIs at runtime,
// but react-native does not include these types.
// This file provides ambient type declarations for React Native builds.

declare global {
  class TextDecoder {
    constructor(label?: string);
    decode(input?: ArrayBufferView | ArrayBuffer): string;
  }
  class TextEncoder {
    constructor();
    encode(input?: string): Uint8Array;
  }
  interface Blob {
    text(): Promise<string>;
  }
}

export {};
