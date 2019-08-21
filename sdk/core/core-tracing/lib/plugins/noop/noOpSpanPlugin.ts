import { Span } from "../../interfaces/span";
import { SpanContext } from "../../interfaces/span_context";
import { Attributes } from "../../interfaces/attributes";
import { Status } from "../../interfaces/status";

export class NoOpSpanPlugin implements Span {
  private _span: any;

  constructor(span: any) {
    this._span = span;
  }

  context(): SpanContext {
    throw new Error("Method not implemented.");
  }

  end(endTime?: number): void {
    this._span.end(endTime);
  }

  start(startTime?: number): void {
    this._span.start(startTime);
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
