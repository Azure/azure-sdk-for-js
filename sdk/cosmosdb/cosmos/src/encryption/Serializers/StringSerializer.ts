// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Serializer } from "./Serializer.js";

declare const TextEncoder: {
  new (): { encode(input: string): Uint8Array };
};
declare const TextDecoder: {
  new (label?: string): { decode(input?: Uint8Array): string };
};

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

export class StringSerializer implements Serializer {
  deserialize(bytes: Uint8Array): string {
    return decoder.decode(bytes);
  }

  serialize(value: string): Uint8Array {
    return encoder.encode(value);
  }
}
