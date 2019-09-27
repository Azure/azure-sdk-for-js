// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Span, getTraceParentHeader } from "@azure/core-tracing";
import { EventData } from "../eventData";

export const TRACEPARENT_PROPERTY = "Diagnostic_Id";

export function instrumentEventData(eventData: EventData, span: Span): EventData {
  if (eventData.properties && eventData.properties[TRACEPARENT_PROPERTY]) {
    return eventData;
  }

  // create a copy so the original isn't modified
  eventData = { ...eventData, properties: { ...eventData.properties } };

  const traceParent = getTraceParentHeader(span.context());
  if (traceParent) {
    eventData.properties![TRACEPARENT_PROPERTY] = traceParent;
  }

  return eventData;
}
