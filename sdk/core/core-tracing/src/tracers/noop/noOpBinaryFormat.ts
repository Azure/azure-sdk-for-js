// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { BinaryFormat, SpanContext } from "@opentelemetry/types";

/**
 * A no-op implementation of BinaryFormat to be used when tracing is disabled.
 */
export class NoOpBinaryFormat implements BinaryFormat {
  /** Serialize the given SpanContext to a buffer */
  toBytes(_spanContext: SpanContext): ArrayBuffer {
    return new ArrayBuffer(0);
  }

  /** 
   * Deserialize a SpanContext from binary encoding. 
   * Returns null if the buffer does not contain a valid SpanContext.
   */
  fromBytes(_buffer: ArrayBuffer): SpanContext | null {
    return null;
  }
}
