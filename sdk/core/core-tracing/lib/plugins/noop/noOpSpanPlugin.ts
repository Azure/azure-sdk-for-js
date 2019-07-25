import { Span } from "../../interfaces/span";
import { SpanContext } from "../../interfaces/span_context";
import { Attributes } from "../../interfaces/attributes";
import { Status } from "../../interfaces/status";

export class NoOpSpanPlugin implements Span {
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
  start(startTime?: number | undefined): void {
    throw new Error("Method not implemented.");
  }
  end(endTime?: number): void {
    throw new Error("Method not implemented.");
  }
  isRecordingEvents(): boolean {
    throw new Error("Method not implemented.");
  }
}
