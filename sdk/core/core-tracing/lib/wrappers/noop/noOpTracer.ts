// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Tracer } from "../../interfaces/tracer";
import { Span } from "../../interfaces/span";
import { SpanOptions } from "../../interfaces/SpanOptions";
import { NoOpSpan } from "./noOpSpan";
import { BinaryFormat } from "../../interfaces/BinaryFormat";
import { HttpTextFormat } from "../../interfaces/HttpTextFormat";
import { NoOpBinaryFormat } from "./noOpBinaryFormat";
import { NoOpHttpTextFormat } from "./noOpHttpTextFormat";

export class NoOpTracer implements Tracer {

  startSpan(_name: string, _options?: SpanOptions): Span {
    return new NoOpSpan();
  }

  getCurrentSpan(): Span {
    return new NoOpSpan();
  }

  withSpan<T extends (...args: unknown[]) => ReturnType<T>>(
    _span: Span,
    fn: T
  ): ReturnType<T> {
    return fn();
  }

  bind<T>(target: T, _span?: Span): T {
    return target;
  }

  recordSpanData(_span: Span): void {
    /* NOOP */
  }

  getBinaryFormat(): BinaryFormat {
    return new NoOpBinaryFormat();
  }

  getHttpTextFormat(): HttpTextFormat {
    return new NoOpHttpTextFormat();
  }
}
