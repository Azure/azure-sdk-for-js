// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface Serializer {
  serialize(value: unknown): Uint8Array;
  deserialize(bytes: Uint8Array): unknown;
}

export class BooleanSerializer implements Serializer {
  serialize(_value: unknown): Uint8Array {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
  deserialize(_bytes: Uint8Array): unknown {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}

export class NumberSerializer implements Serializer {
  serialize(_value: unknown): Uint8Array {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
  deserialize(_bytes: Uint8Array): unknown {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}

export class FloatSerializer implements Serializer {
  serialize(_value: unknown): Uint8Array {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
  deserialize(_bytes: Uint8Array): unknown {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}

export class StringSerializer implements Serializer {
  serialize(_value: unknown): Uint8Array {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
  deserialize(_bytes: Uint8Array): unknown {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}
