// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Serializer } from "./Serializer";

export class FloatSerializer implements Serializer {
  private static instance: FloatSerializer;

  private constructor() {
    if (FloatSerializer.instance) {
      throw new Error("Already initialized. Use getInstance() method instead");
    }
    console.log("no instance of float serializer found");
  }

  public static getInstance(): FloatSerializer {
    if (!FloatSerializer.instance) {
      FloatSerializer.instance = new FloatSerializer();
    }
    return FloatSerializer.instance;
  }

  deserialize(bytes: Buffer): number {
    if (!bytes || bytes.length < 8) {
      throw new Error("Invalid byte array for deserialization");
    }
    const res = bytes.readDoubleLE(0);
    return res;
  }

  serialize(value: number): Buffer {
    if (!Number.isFinite(value)) {
      throw new Error("Value is out of range");
    }
    const buffer = Buffer.alloc(8);
    buffer.writeDoubleLE(value, 0);
    return buffer;
  }
}
