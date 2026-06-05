// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Serializer } from "./Serializer.js";

export class StringSerializer implements Serializer {
  private static characterEncoding: BufferEncoding = "utf-8";

  deserialize(bytes: Buffer): string {
    return bytes.toString(StringSerializer.characterEncoding);
  }

  serialize(value: string): Buffer {
    return Buffer.from(value, StringSerializer.characterEncoding);
  }
}
