// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Serializer } from "./Serializer.js";

export class NumberSerializer implements Serializer {
  deserialize(bytes: Uint8Array<ArrayBuffer>): number {
    if (!bytes || bytes.length < 8) {
      throw new Error("Invalid byte array for deserialization");
    }
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    return Number(view.getBigInt64(0, true));
  }

  serialize(value: number): Uint8Array<ArrayBuffer> {
    const buffer = new Uint8Array(8);
    const view = new DataView(buffer.buffer);
    view.setBigInt64(0, BigInt(value), true);
    return buffer;
  }
}
