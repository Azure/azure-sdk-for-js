// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Serializer } from "./Serializer";

export class BitSerializer implements Serializer {
  private static instance: BitSerializer;

  private constructor() {
    if (BitSerializer.instance) {
      throw new Error("Already initialized. Use getInstance() method instead");
    }
    console.log("no instance found");
  }

  public static getInstance(): BitSerializer {
    if (!BitSerializer.instance) {
      BitSerializer.instance = new BitSerializer();
    }
    return BitSerializer.instance;
  }

  serialize(value: boolean): Buffer {
    const numValue = value ? 1 : 0;
    const buffer = Buffer.alloc(8);
    buffer.writeBigInt64LE(BigInt(numValue), 0);
    return buffer;
  }

  deserialize(bytes: Buffer): boolean {
    if (!bytes || bytes.length < 1) {
      throw new Error("Invalid byte array for deserialization");
    }
    return !!bytes[0];
  }
}
