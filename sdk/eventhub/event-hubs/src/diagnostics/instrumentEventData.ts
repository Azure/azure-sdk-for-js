import { Span, getTraceParent } from '@azure/core-tracing';
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