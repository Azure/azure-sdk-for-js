// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentThreadOutput } from "../generated/src/outputModels.js";
import type { Span } from "../tracing.js";
import { TracingUtility, TracingOperationName } from "../tracing.js";
import type { CreateThreadParameters } from "../generated/src/parameters.js";
import { addMessageEvent, UpdateWithAgentAttributes } from "./traceUtility.js";

export function traceStartCreateThread(span: Span, options: CreateThreadParameters): void {
  TracingUtility.setSpanAttributes(
    span,
    TracingOperationName.CREATE_THREAD,
    UpdateWithAgentAttributes({}),
  );
  setSpanEvents(span, options);
}

export async function traceEndCreateThread(
  span: Span,
  _options: CreateThreadParameters,
  result: Promise<AgentThreadOutput>,
): Promise<void> {
  const resolvedResult = await result;
  TracingUtility.updateSpanAttributes(span, { threadId: resolvedResult.id });
}

function setSpanEvents(span: Span, options: CreateThreadParameters): void {
  options.body.messages?.forEach((message) => {
    addMessageEvent(span, message);
  });
}
