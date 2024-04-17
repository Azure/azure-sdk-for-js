// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Serializer } from "./Serializer";

export class StringSerializer implements Serializer {
  private static instance: StringSerializer;

  private constructor() {
    if (StringSerializer.instance) {
      throw new Error("Already initialized. Use getInstance() method instead");
    }
    console.log("no instance of String Serializer found");
  }

  public static getInstance(): StringSerializer {
    if (!StringSerializer.instance) {
      StringSerializer.instance = new StringSerializer();
    }
    return StringSerializer.instance;
  }
  private static characterEncoding: BufferEncoding = "utf-8";

  deserialize(bytes: Buffer): string {
    return bytes.toString(StringSerializer.characterEncoding);
  }

  serialize(value: string): Buffer {
    return Buffer.from(value, StringSerializer.characterEncoding);
  }
}
