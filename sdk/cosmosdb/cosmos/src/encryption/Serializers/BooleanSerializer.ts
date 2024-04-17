// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Serializer } from "./Serializer";

export class BooleanSerializer implements Serializer {
  private static instance: BooleanSerializer;

  private constructor() {
    if (BooleanSerializer.instance) {
      throw new Error("Already initialized. Use getInstance() method instead");
    }
    console.log("no instance found");
  }

  public static getInstance(): BooleanSerializer {
    if (!BooleanSerializer.instance) {
      BooleanSerializer.instance = new BooleanSerializer();
    }
    return BooleanSerializer.instance;
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
