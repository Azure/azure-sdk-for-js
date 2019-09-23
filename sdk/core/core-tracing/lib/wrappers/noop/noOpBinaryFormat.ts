// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { BinaryFormat } from "../../interfaces/BinaryFormat";
import { SpanContext } from "../../interfaces/span_context";

export class NoOpBinaryFormat implements BinaryFormat {
  toBytes(_spanContext: SpanContext): ArrayBuffer {
    return new ArrayBuffer(0);
  }

  fromBytes(_buffer: ArrayBuffer): SpanContext | null {
    return null;
  }
}
