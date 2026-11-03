// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type declarations for React Native environments.
//
// HERMES NATIVE SUPPORT (built into the engine):
// - TextEncoder/TextDecoder
// - Blob (basic support)
// - Blob.arrayBuffer()
//
// These APIs are available at runtime in React Native with Hermes,
// but the react-native package types don't include them.

declare global {
  class TextEncoder {
    constructor();
    encode(input?: string): Uint8Array;
  }

  class TextDecoder {
    constructor(label?: string);
    decode(input?: ArrayBufferView | ArrayBuffer): string;
  }

  // Augment Blob interface with arrayBuffer() method available in Hermes
  interface Blob {
    arrayBuffer(): Promise<ArrayBuffer>;
  }
}

export {};
