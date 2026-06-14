// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Serializer } from "./Serializer.js";

declare const TextEncoder: {
  new (): { encode(input: string): Uint8Array<ArrayBuffer> };
};
declare const TextDecoder: {
  new (label?: string): { decode(input?: Uint8Array<ArrayBuffer>): string };
};

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

export class StringSerializer implements Serializer {
  deserialize(bytes: Uint8Array<ArrayBuffer>): string {
    return decoder.decode(bytes);
  }

  serialize(value: string): Uint8Array<ArrayBuffer> {
    return encoder.encode(value);
  }
}
