// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpTextFormat } from "../../interfaces/HttpTextFormat";
import { SpanContext } from "../../interfaces/span_context";

export class NoOpHttpTextFormat implements HttpTextFormat {
  inject(_spanContext: SpanContext, _format: string, _carrier: unknown): void { }
  extract(_format: string, _carrier: unknown): SpanContext | null {
    return null;
  }
}
