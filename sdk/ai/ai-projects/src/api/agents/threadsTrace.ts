// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentThread } from "../../models/agents/index.js";
import type { Span } from "./tracing.js";
import { TracingUtility, TracingOperationName } from "./tracing.js";
import type { AgentsCreateThreadOptionalParams } from "../options.js";
import { addMessageEvent, UpdateWithAgentAttributes } from "./traceUtility.js";

export function traceStartCreateThread(span: Span, options: AgentsCreateThreadOptionalParams): void {
  TracingUtility.setSpanAttributes(
    span,
    TracingOperationName.CREATE_THREAD,
    UpdateWithAgentAttributes({}),
  );
  setSpanEvents(span, options);
}

export async function traceEndCreateThread(
  span: Span,
  _options: AgentsCreateThreadOptionalParams,
  result: Promise<AgentThread>,
): Promise<void> {
  const resolvedResult = await result;
  TracingUtility.updateSpanAttributes(span, { threadId: resolvedResult.id });
}

function setSpanEvents(span: Span, options: AgentsCreateThreadOptionalParams): void {
  options.messages?.forEach((message) => {
    addMessageEvent(span, message);
  });
}
