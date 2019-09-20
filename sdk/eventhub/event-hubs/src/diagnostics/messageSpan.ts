import { SpanContext, Span, TracerProxy, SpanKind, getTraceParent } from '@azure/core-tracing';
import { EventData } from '../eventData';

export const TRACEPARENT_PROPERTY = "Diagnostic_Id";

export function instrumentEventData(eventData: EventData, span: Span): boolean {
  if (eventData.properties && eventData.properties[TRACEPARENT_PROPERTY]) {
    return false;
  }

  try {
    const traceParent = getTraceParent(span.context());
    eventData.properties = eventData.properties || {};
    eventData.properties[TRACEPARENT_PROPERTY] =  traceParent;
  } catch {
    // swallow the error, the event data won't be modified
    return false;
  };

  return true;
}

export function createMessageSpan(parentSpan?: Span | SpanContext): Span {
  const tracer = TracerProxy.getTracer();
  const span = tracer.startSpan("Azure.EventHubs.message", {
    kind: SpanKind.INTERNAL,
    parent: parentSpan
  });
  span.start(); // TODO: remove once #5182 is merged

  return span;
}