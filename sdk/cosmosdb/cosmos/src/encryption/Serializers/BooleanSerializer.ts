// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Serializer } from "./Serializer.js";

export class BooleanSerializer implements Serializer {
  serialize(value: boolean): Uint8Array {
    const buffer = new Uint8Array(8);
    const view = new DataView(buffer.buffer);
    view.setBigInt64(0, BigInt(value ? 1 : 0), true);
    return buffer;
  }

  deserialize(bytes: Uint8Array): boolean {
    if (!bytes || bytes.length < 1) {
      throw new Error("Invalid byte array for deserialization");
    }
    return !!bytes[0];
  }
}
