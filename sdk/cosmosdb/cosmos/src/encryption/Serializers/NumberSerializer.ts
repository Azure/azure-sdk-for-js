// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Serializer } from "./Serializer";

export class NumberSerializer implements Serializer {
  deserialize(bytes: Buffer): number {
    if (!bytes || bytes.length < 8) {
      throw new Error("Invalid byte array for deserialization");
    }
    const num = Number(bytes.readBigInt64LE(0));
    return num;
  }

  serialize(value: number): Buffer {
    const newValue = BigInt(value);
    const buffer = Buffer.alloc(8);
    buffer.writeBigInt64LE(newValue, 0);
    return buffer;
  }
}

// const instance = new NumberSerializer();
// export { instance }
