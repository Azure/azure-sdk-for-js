// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Serializer } from "./Serializer";

export class NumberSerializer implements Serializer {
  private static instance: NumberSerializer;

  private constructor() {
    if (NumberSerializer.instance) {
      throw new Error("Already initialized. Use getInstance() method instead");
    }
    console.log("no instance of Number Serializer found");
  }

  public static getInstance(): NumberSerializer {
    if (!NumberSerializer.instance) {
      NumberSerializer.instance = new NumberSerializer();
    }
    return NumberSerializer.instance;
  }

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
