// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Span } from "../../interfaces/span";
import { SpanContext } from "../../interfaces/span_context";
import { Attributes } from "../../interfaces/attributes";
import { Status } from "../../interfaces/status";

export class NoOpSpan implements Span {

  context(): SpanContext {
    return {
      spanId: "",
      traceId: ""
    };
  }

  end(_endTime?: number): void {
    /* Noop */
  }

  start(_startTime?: number): void {
    /* Noop */
  }

  setAttribute(_key: string, _value: unknown): this {
    return this;
  }

  setAttributes(_attributes: Attributes): this {
    return this;
  }

  addEvent(_name: string, _attributes?: Attributes): this {
    return this;
  }

  addLink(_spanContext: SpanContext, _attributes?: Attributes): this {
    return this;
  }

  setStatus(_status: Status): this {
    return this;
  }

  updateName(_name: string): this {
    return this;
  }

  isRecordingEvents(): boolean {
    return false;
  }
}
