// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Tracer } from "../../interfaces/tracer";
import { Span } from "../../interfaces/span";
import { SpanOptions } from "../../interfaces/SpanOptions";
import { NoOpSpan } from "./noOpSpan";
import { SupportedPlugins } from '../../utils/supportedPlugins';
import { BinaryFormat } from "../../interfaces/BinaryFormat";
import { HttpTextFormat } from "../../interfaces/HttpTextFormat";

export class NoOpTrace implements Tracer {

  public readonly pluginType = SupportedPlugins.NOOP;

  startSpan(_name: string, _options?: SpanOptions): Span {
    return new NoOpSpan();
  }

  getCurrentSpan(): Span {
    throw new Error("Method not implemented.");
  }
  withSpan<T extends (...args: unknown[]) => unknown>(_span: Span, _fn: T): ReturnType<T> {
    throw new Error("Method not implemented.");
  }
  bind<T>(_target: T, _span?: Span): T {
    throw new Error("Method not implemented.");
  }
  recordSpanData(_span: Span): void {
    throw new Error("Method not implemented.");
  }
  getBinaryFormat(): BinaryFormat {
    throw new Error("Method not implemented.");
  }
  getHttpTextFormat(): HttpTextFormat {
    throw new Error("Method not implemented.");
  }
}
