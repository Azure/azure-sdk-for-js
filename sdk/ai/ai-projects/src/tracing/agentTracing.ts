// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Agent, AgentVersion } from "../models/models.js";
import type { ResolvedTracingConfig } from "./configuration.js";
import { startSpan, runInSpanContext } from "./tracingClient.js";
import { setCommonAttributes, setAgentAttributes, setAgentVersionAttributes, setErrorAttributes } from "./attributes.js";
import { OperationName } from "./constants.js";

/**
 * Wraps an agent-create operation with tracing. When tracing is disabled,
 * the operation is executed directly. When enabled, a span is created and
 * the operation runs inside runInSpanContext so child spans (e.g. HTTP)
 * are correctly parented.
 * @internal
 */
export async function traceAgentCreate(
  name: string,
  endpoint: string,
  tracingConfig: ResolvedTracingConfig | undefined,
  operation: () => Promise<Agent>,
): Promise<Agent> {
  if (!tracingConfig?.enabled) {
    return operation();
  }
  const { span, ctx } = startSpan(`${OperationName.CREATE_AGENT} ${name}`);
  try {
    setCommonAttributes(span, OperationName.CREATE_AGENT, endpoint);
    const agent = await runInSpanContext(ctx, operation);
    setAgentAttributes(span, agent, tracingConfig.contentRecording);
    span.end();
    return agent;
  } catch (error) {
    setErrorAttributes(span, error);
    span.setStatus({ code: 2, message: error instanceof Error ? error.name : "Error" });
    span.end();
    throw error;
  }
}

/**
 * Wraps an agent-version-create operation with tracing.
 * @internal
 */
export async function traceAgentVersionCreate(
  agentName: string,
  endpoint: string,
  tracingConfig: ResolvedTracingConfig | undefined,
  operation: () => Promise<AgentVersion>,
): Promise<AgentVersion> {
  if (!tracingConfig?.enabled) {
    return operation();
  }
  const { span, ctx } = startSpan(`${OperationName.CREATE_AGENT} ${agentName}`);
  try {
    setCommonAttributes(span, OperationName.CREATE_AGENT, endpoint);
    const version = await runInSpanContext(ctx, operation);
    setAgentVersionAttributes(span, version, tracingConfig.contentRecording);
    span.end();
    return version;
  } catch (error) {
    setErrorAttributes(span, error);
    span.setStatus({ code: 2, message: error instanceof Error ? error.name : "Error" });
    span.end();
    throw error;
  }
}
