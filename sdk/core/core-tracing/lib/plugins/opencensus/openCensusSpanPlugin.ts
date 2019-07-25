import { Span } from "../../interfaces/span";
import { SpanContext } from "../../interfaces/span_context";
import { Attributes } from "../../interfaces/attributes";
import { Status } from "../../interfaces/status";

export class OpenCensusSpanPlugin implements Span {
  private _span: Span;

  constructor(span: Span) {
    this._span = span;
  }

  end(endTime?: number): void {
    this._span.end(endTime);
  }

  start(startTime?: number): void {
    this._span.start(startTime);
  }

  context(): SpanContext {
    throw new Error("Method not implemented.");
  }
  setAttribute(key: string, value: unknown): this {
    throw new Error("Method not implemented.");
  }
  setAttributes(attributes: Attributes): this {
    throw new Error("Method not implemented.");
  }
  addEvent(name: string, attributes?: Attributes): this {
    throw new Error("Method not implemented.");
  }
  addLink(spanContext: SpanContext, attributes?: Attributes): this {
    throw new Error("Method not implemented.");
  }
  setStatus(status: Status): this {
    throw new Error("Method not implemented.");
  }
  updateName(name: string): this {
    throw new Error("Method not implemented.");
  }
  isRecordingEvents(): boolean {
    throw new Error("Method not implemented.");
  }
}
