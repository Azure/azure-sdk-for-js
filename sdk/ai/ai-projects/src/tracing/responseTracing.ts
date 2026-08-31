// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Response as OAIResponse } from "openai/resources/responses/responses";
import type { Span } from "@opentelemetry/api";
import { startSpan, runInSpanContext } from "./tracingClient.js";
import {
  parseEndpoint,
  setCommonAttributes,
  setCommonSpanAttributes,
  setResponseSpanAttributes,
  setErrorAttributes,
} from "./attributes.js";
import {
  OperationName,
  GEN_AI_CONVERSATION_ID,
  GEN_AI_WORKFLOW_ACTION_EVENT,
  GEN_AI_PROVIDER_NAME,
  GEN_AI_EVENT_CONTENT,
  AGENTS_PROVIDER,
} from "./constants.js";
import { recordOperationDuration, recordTokenUsage } from "./metrics.js";

interface StreamMetricsContext {
  startTime: number;
  operationName: string;
  serverAddress?: string;
  serverPort?: number;
}

export async function traceNonStreamingResponse(
  responsesCreate: (...args: unknown[]) => unknown,
  body: Record<string, unknown>,
  options: Record<string, unknown>,
  spanName: string,
  operationName: string,
  endpoint: string,
  agentName?: string,
  contentRecording: boolean = false,
): Promise<unknown> {
  const startTime = performance.now();
  const { serverAddress, serverPort } = parseEndpoint(endpoint);
  let errorType: string | undefined;
  let responseModel: string | undefined;

  const { span, ctx } = startSpan(spanName);
  try {
    setCommonSpanAttributes(
      span,
      operationName,
      serverAddress,
      serverPort,
      body,
      agentName,
      contentRecording,
    );
    const response = (await runInSpanContext(ctx, () =>
      responsesCreate(body, options),
    )) as OAIResponse;
    setResponseSpanAttributes(span, response, contentRecording);
    addWorkflowActionEvents(span, response, contentRecording);
    responseModel = typeof response.model === "string" ? response.model : undefined;

    // Record metrics
    const durationSeconds = (performance.now() - startTime) / 1000;
    recordOperationDuration(durationSeconds, {
      operationName,
      serverAddress,
      serverPort,
      responseModel,
    });
    if (response.usage) {
      recordTokenUsage(response.usage.input_tokens, response.usage.output_tokens, {
        operationName,
        serverAddress,
        serverPort,
        responseModel,
      });
    }

    span.setStatus({ code: 1 }); // SpanStatusCode.OK
    span.end();
    return response;
  } catch (error) {
    setErrorAttributes(span, error);
    errorType = error instanceof Error ? error.name || error.constructor?.name || "Error" : "Error";
    const durationSeconds = (performance.now() - startTime) / 1000;
    recordOperationDuration(durationSeconds, {
      operationName,
      serverAddress,
      serverPort,
      errorType,
    });
    span.setStatus({ code: 2, message: errorType }); // SpanStatusCode.ERROR
    span.end();
    throw error;
  }
}

export async function traceStreamingResponse(
  responsesCreate: (...args: unknown[]) => unknown,
  body: Record<string, unknown>,
  options: Record<string, unknown>,
  spanName: string,
  operationName: string,
  endpoint: string,
  agentName?: string,
  contentRecording: boolean = false,
): Promise<unknown> {
  const startTime = performance.now();
  const { serverAddress, serverPort } = parseEndpoint(endpoint);
  const { span, ctx } = startSpan(spanName);
  setCommonSpanAttributes(
    span,
    operationName,
    serverAddress,
    serverPort,
    body,
    agentName,
    contentRecording,
  );

  try {
    const stream = await runInSpanContext(
      ctx,
      () => responsesCreate(body, options) as Promise<AsyncIterable<unknown>>,
    );
    return wrapStream(
      stream,
      span,
      {
        startTime,
        operationName,
        serverAddress,
        serverPort,
      },
      contentRecording,
    );
  } catch (error) {
    setErrorAttributes(span, error);
    span.setStatus({ code: 2, message: error instanceof Error ? error.message : "Error" });
    span.end();
    const errorType =
      error instanceof Error ? error.name || error.constructor?.name || "Error" : "Error";
    const durationSeconds = (performance.now() - startTime) / 1000;
    recordOperationDuration(durationSeconds, {
      operationName,
      serverAddress,
      serverPort,
      errorType,
    });
    throw error;
  }
}

function wrapStream(
  innerStream: AsyncIterable<unknown>,
  span: Span,
  metricsCtx: StreamMetricsContext,
  contentRecording: boolean = false,
): AsyncIterable<unknown> {
  const iterator = innerStream[Symbol.asyncIterator]();
  let completedResponse: OAIResponse | undefined;

  function recordStreamMetrics(errorType?: string): void {
    const durationSeconds = (performance.now() - metricsCtx.startTime) / 1000;
    const responseModel =
      completedResponse && typeof completedResponse.model === "string"
        ? completedResponse.model
        : undefined;
    recordOperationDuration(durationSeconds, {
      operationName: metricsCtx.operationName,
      serverAddress: metricsCtx.serverAddress,
      serverPort: metricsCtx.serverPort,
      responseModel,
      errorType,
    });
    if (completedResponse?.usage) {
      recordTokenUsage(
        completedResponse.usage.input_tokens,
        completedResponse.usage.output_tokens,
        {
          operationName: metricsCtx.operationName,
          serverAddress: metricsCtx.serverAddress,
          serverPort: metricsCtx.serverPort,
          responseModel,
        },
      );
    }
  }

  const wrappedIterator: AsyncIterator<unknown> = {
    async next() {
      try {
        const result = await iterator.next();
        if (result.done) {
          span.setStatus({ code: 1 }); // OK
          span.end();
          recordStreamMetrics();
          return result;
        }
        // Check for response.completed event to capture final attributes
        const event = result.value as Record<string, unknown>;
        if (event?.type === "response.output_item.done") {
          const item = (event as { item?: Record<string, unknown> }).item;
          if (item?.type === "workflow_action") {
            addSingleWorkflowActionEvent(span, item, contentRecording);
          }
        }
        if (event?.type === "response.completed" && event.response) {
          completedResponse = event.response as OAIResponse;
          setResponseSpanAttributes(span, completedResponse, contentRecording);
        }
        return result;
      } catch (error) {
        setErrorAttributes(span, error);
        span.setStatus({ code: 2, message: error instanceof Error ? error.message : "Error" });
        span.end();
        const errType =
          error instanceof Error ? error.name || error.constructor?.name || "Error" : "Error";
        recordStreamMetrics(errType);
        throw error;
      }
    },
    async return(value?: unknown) {
      span.setStatus({ code: 1 }); // OK
      span.end();
      recordStreamMetrics();
      if (iterator.return) {
        return iterator.return(value);
      }
      return { done: true, value: undefined };
    },
    async throw(error?: unknown) {
      setErrorAttributes(span, error);
      span.setStatus({
        code: 2,
        message: error instanceof Error ? (error as Error).message : "Error",
      });
      span.end();
      const errType =
        error instanceof Error ? error.name || error.constructor?.name || "Error" : "Error";
      recordStreamMetrics(errType);
      if (iterator.throw) {
        return iterator.throw(error);
      }
      throw error;
    },
  };

  // Preserve the original stream object's shape — copy all properties and override the iterator
  const wrappedStream = Object.create(
    Object.getPrototypeOf(innerStream) as object,
    Object.getOwnPropertyDescriptors(innerStream),
  ) as AsyncIterable<unknown>;
  (wrappedStream as unknown as Record<string | symbol, unknown>)[Symbol.asyncIterator] = () =>
    wrappedIterator;

  return wrappedStream;
}

/**
 * Emits a gen_ai.workflow.action event for a single workflow action item.
 */
function addSingleWorkflowActionEvent(
  span: Span,
  item: Record<string, unknown>,
  contentRecording: boolean = false,
): void {
  const workflowDetails: Record<string, unknown> = {};
  if (item.status) workflowDetails.status = item.status;
  if (contentRecording) {
    if (item.action_id) workflowDetails.action_id = item.action_id;
    if (item.previous_action_id) workflowDetails.previous_action_id = item.previous_action_id;
  }

  const contentArray = [
    {
      role: "workflow",
      parts: [{ type: "workflow_action", content: workflowDetails }],
    },
  ];

  span.addEvent(GEN_AI_WORKFLOW_ACTION_EVENT, {
    [GEN_AI_PROVIDER_NAME]: AGENTS_PROVIDER,
    [GEN_AI_EVENT_CONTENT]: JSON.stringify(contentArray),
  });
}

/**
 * Emits workflow action events from a non-streaming response.
 */
function addWorkflowActionEvents(
  span: Span,
  response: OAIResponse,
  contentRecording: boolean = false,
): void {
  const output = (response as unknown as Record<string, unknown>).output;
  if (!Array.isArray(output)) return;
  for (const item of output) {
    if (
      item &&
      typeof item === "object" &&
      (item as Record<string, unknown>).type === "workflow_action"
    ) {
      addSingleWorkflowActionEvent(span, item as Record<string, unknown>, contentRecording);
    }
  }
}

export async function traceConversationCreate(
  conversationsCreate: (...args: unknown[]) => unknown,
  args: unknown[],
  endpoint: string,
): Promise<unknown> {
  const { span, ctx } = startSpan(OperationName.CREATE_CONVERSATION);
  try {
    setCommonAttributes(span, OperationName.CREATE_CONVERSATION, endpoint);
    const result = await runInSpanContext(ctx, () =>
      (conversationsCreate as (...a: unknown[]) => Promise<unknown>)(...args),
    );
    const conversation = result as Record<string, unknown>;
    if (typeof conversation.id === "string") {
      span.setAttribute(GEN_AI_CONVERSATION_ID, conversation.id);
    }
    return result;
  } finally {
    span.end();
  }
}
