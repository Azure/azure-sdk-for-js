// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpTextFormat, SpanContext } from "@opentelemetry/types";

/**
 * A no-op implementation of HttpTextFormat to be used when tracing is disabled.
 */
export class NoOpHttpTextFormat implements HttpTextFormat {
  /**
   * Injects the given SpanContext for transmitting to a remote server.
   * @param _spanContext The SpanContext to transmit
   * @param _format The format of the carrier
   * @param _carrier The carrier to propagate through, e.g. an HTTP request
   */
  inject(_spanContext: SpanContext, _format: string, _carrier: unknown): void {}
  /**
   * Returns a SpanContext intance extracted from the carrier.
   * @param _format the format of the carrier
   * @param _carrier The carrier being used for propagation, e.g. an HTTP request
   */
  extract(_format: string, _carrier: unknown): SpanContext | null {
    return null;
  }
}
