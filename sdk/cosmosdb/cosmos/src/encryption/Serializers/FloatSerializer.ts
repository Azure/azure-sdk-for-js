// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Serializer } from "./Serializer.js";

export class FloatSerializer implements Serializer {
  deserialize(bytes: Uint8Array): number {
    if (!bytes || bytes.length < 8) {
      throw new Error("Invalid byte array for deserialization");
    }
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    return view.getFloat64(0, true);
  }

  serialize(value: number): Uint8Array {
    if (!Number.isFinite(value)) {
      throw new Error("Value is out of range");
    }
    const buffer = new Uint8Array(8);
    const view = new DataView(buffer.buffer);
    view.setFloat64(0, value, true);
    return buffer;
  }
}
