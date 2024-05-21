// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Serializer } from "./Serializer";

export class StringSerializer implements Serializer {
  private static characterEncoding: BufferEncoding = "utf-8";

  deserialize(bytes: Buffer): string {
    return bytes.toString(StringSerializer.characterEncoding);
  }

  serialize(value: string): Buffer {
    return Buffer.from(value, StringSerializer.characterEncoding);
  }
}
