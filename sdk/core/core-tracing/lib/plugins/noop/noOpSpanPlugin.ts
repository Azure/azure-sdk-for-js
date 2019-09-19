// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Span } from "../../interfaces/span";
import { SpanContext } from "../../interfaces/span_context";
import { Attributes } from "../../interfaces/attributes";
import { Status } from "../../interfaces/status";

export class NoOpSpanPlugin implements Span {

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
    throw new Error("Method not implemented.");
  }

  setAttributes(_attributes: Attributes): this {
    throw new Error("Method not implemented.");
  }

  addEvent(_name: string, _attributes?: Attributes): this {
    throw new Error("Method not implemented.");
  }

  addLink(_spanContext: SpanContext, _attributes?: Attributes): this {
    throw new Error("Method not implemented.");
  }

  setStatus(_status: Status): this {
    throw new Error("Method not implemented.");
  }

  updateName(_name: string): this {
    throw new Error("Method not implemented.");
  }

  isRecordingEvents(): boolean {
    throw new Error("Method not implemented.");
  }
}
