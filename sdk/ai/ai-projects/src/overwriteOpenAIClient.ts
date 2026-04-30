// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type OpenAI from "openai";
import type { Response as OAIResponse } from "openai/resources/responses/responses";
import { isGenAITracingEnabled, isContentRecordingEnabled } from "./tracing/configuration.js";
import { tracingClient } from "./tracing/tracingClient.js";
import { setResponseAttributes, setErrorAttributes } from "./tracing/attributes.js";
import { formatInputMessages, formatOutputMessages } from "./tracing/formatters.js";
import {
  GEN_AI_OPERATION_NAME,
  GEN_AI_REQUEST_MODEL,
  GEN_AI_REQUEST_TEMPERATURE,
  GEN_AI_REQUEST_TOP_P,
  GEN_AI_INPUT_MESSAGES,
  GEN_AI_OUTPUT_MESSAGES,
  GEN_AI_SYSTEM_MESSAGE,
  GEN_AI_AGENT_NAME,
  GEN_AI_CONVERSATION_ID,
  AZ_NAMESPACE,
  AZ_NAMESPACE_VALUE,
  GEN_AI_PROVIDER_NAME,
  AGENTS_PROVIDER,
  SERVER_ADDRESS,
  SERVER_PORT,
  OperationName,
} from "./tracing/constants.js";
import type { TracingSpan } from "@azure/core-tracing";
import { recordOperationDuration, recordTokenUsage } from "./tracing/metrics.js";

type SpanLike = Pick<TracingSpan, "setAttribute" | "setStatus">;

function parseEndpoint(endpoint: string): { serverAddress?: string; serverPort?: number } {
  try {
    const url = new URL(endpoint);
    const port = url.port ? parseInt(url.port, 10) : undefined;
    return { serverAddress: url.hostname, serverPort: port };
  } catch {
    return {};
  }
}

export function overwriteOpenAIClient(openaiClient: OpenAI, endpoint: string): OpenAI {
  const responsesCreate = openaiClient.responses.create.bind(openaiClient.responses);
  openaiClient.responses.create = ((...args: Parameters<typeof responsesCreate>) => {
    const [body, options = {}] = args;
    const nextBody = { ...body, ...((options.body as Record<string, unknown>) || {}) };
    const { body: _, ...nextOptions } = options;

    if (!isGenAITracingEnabled()) {
      return responsesCreate(nextBody, nextOptions);
    }

    // Determine operation and span name (matching C# pattern)
    const rawAgent = (nextBody as Record<string, unknown>).agent_name ??
      (nextBody as Record<string, unknown>).agent;
    // agent can be a string name or an object like { name: "...", type: "agent_reference" }
    const agentName: string | undefined =
      typeof rawAgent === "string"
        ? rawAgent
        : rawAgent && typeof rawAgent === "object" && typeof (rawAgent as Record<string, unknown>).name === "string"
          ? (rawAgent as Record<string, unknown>).name as string
          : undefined;
    let operationName: string;
    let spanName: string;
    if (agentName) {
      operationName = OperationName.INVOKE_AGENT;
      spanName = `${OperationName.INVOKE_AGENT} ${agentName}`;
    } else {
      operationName = OperationName.CHAT;
      const model = nextBody.model;
      spanName = model ? `${OperationName.CHAT} ${model}` : OperationName.CHAT;
    }

    const isStreaming = nextBody.stream === true;

    if (isStreaming) {
      return traceStreamingResponse(
        responsesCreate,
        nextBody,
        nextOptions,
        spanName,
        operationName,
        endpoint,
        agentName,
      );
    }
    return traceNonStreamingResponse(
      responsesCreate,
      nextBody,
      nextOptions,
      spanName,
      operationName,
      endpoint,
      agentName,
    );
  }) as typeof responsesCreate;
  return openaiClient;
}

function setCommonSpanAttributes(
  span: SpanLike,
  operationName: string,
  serverAddress: string | undefined,
  serverPort: number | undefined,
  body: Record<string, unknown>,
  agentName?: string,
): void {
  span.setAttribute(GEN_AI_OPERATION_NAME, operationName);
  span.setAttribute(AZ_NAMESPACE, AZ_NAMESPACE_VALUE);
  span.setAttribute(GEN_AI_PROVIDER_NAME, AGENTS_PROVIDER);

  // Server attributes
  if (serverAddress) {
    span.setAttribute(SERVER_ADDRESS, serverAddress);
  }
  if (serverPort && serverPort !== 443) {
    span.setAttribute(SERVER_PORT, serverPort);
  }

  // Agent name for invoke_agent operations
  if (agentName) {
    span.setAttribute(GEN_AI_AGENT_NAME, agentName);
  }

  // Conversation ID
  const conversationId = body.conversation;
  if (typeof conversationId === "string" && conversationId) {
    span.setAttribute(GEN_AI_CONVERSATION_ID, conversationId);
  }

  // Input messages are always set (content is stripped when recording is off)
  const inputMessages = formatInputMessages(body);
  if (inputMessages) {
    span.setAttribute(GEN_AI_INPUT_MESSAGES, inputMessages);
  }

  // Request attributes (content-recording gated)
  if (isContentRecordingEnabled()) {
    if (body.model) {
      span.setAttribute(GEN_AI_REQUEST_MODEL, String(body.model));
    }
    if (body.temperature !== undefined) {
      span.setAttribute(GEN_AI_REQUEST_TEMPERATURE, String(body.temperature));
    }
    if (body.top_p !== undefined) {
      span.setAttribute(GEN_AI_REQUEST_TOP_P, String(body.top_p));
    }
    // system_instructions only for non-agent (chat) operations
    if (!agentName) {
      if (body.instructions) {
        span.setAttribute(
          GEN_AI_SYSTEM_MESSAGE,
          JSON.stringify([{ type: "text", content: String(body.instructions) }]),
        );
      } else {
        span.setAttribute(GEN_AI_SYSTEM_MESSAGE, JSON.stringify([{ type: "text" }]));
      }
    }
  }
}

function setResponseSpanAttributes(span: SpanLike, response: OAIResponse): void {
  setResponseAttributes(span, {
    id: response.id,
    model: typeof response.model === "string" ? response.model : undefined,
    usage: response.usage
      ? {
          input_tokens: response.usage.input_tokens,
          output_tokens: response.usage.output_tokens,
        }
      : undefined,
    status: response.status ?? undefined,
  });

  // Output messages are always set (content is stripped when recording is off)
  const outputMessages = formatOutputMessages(response as unknown as Record<string, unknown>);
  if (outputMessages) {
    span.setAttribute(GEN_AI_OUTPUT_MESSAGES, outputMessages);
  }
}

async function traceNonStreamingResponse(
  responsesCreate: (...args: unknown[]) => unknown,
  body: Record<string, unknown>,
  options: Record<string, unknown>,
  spanName: string,
  operationName: string,
  endpoint: string,
  agentName?: string,
): Promise<unknown> {
  const startTime = performance.now();
  const { serverAddress, serverPort } = parseEndpoint(endpoint);
  let errorType: string | undefined;
  let responseModel: string | undefined;

  return tracingClient.withSpan(
    spanName,
    { tracingOptions: {} },
    async (_updatedOptions, span) => {
      try {
        setCommonSpanAttributes(span, operationName, serverAddress, serverPort, body, agentName);
        const response = (await responsesCreate(body, options)) as OAIResponse;
        setResponseSpanAttributes(span, response);
        responseModel =
          typeof response.model === "string" ? response.model : undefined;

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

        return response;
      } catch (error) {
        setErrorAttributes(span, error);
        errorType =
          error instanceof Error
            ? error.name || error.constructor?.name || "Error"
            : "Error";
        const durationSeconds = (performance.now() - startTime) / 1000;
        recordOperationDuration(durationSeconds, {
          operationName,
          serverAddress,
          serverPort,
          errorType,
        });
        throw error;
      }
    },
  );
}

async function traceStreamingResponse(
  responsesCreate: (...args: unknown[]) => unknown,
  body: Record<string, unknown>,
  options: Record<string, unknown>,
  spanName: string,
  operationName: string,
  endpoint: string,
  agentName?: string,
): Promise<unknown> {
  const startTime = performance.now();
  const { serverAddress, serverPort } = parseEndpoint(endpoint);
  const { span } = tracingClient.startSpan(spanName, { tracingOptions: {} });
  setCommonSpanAttributes(span, operationName, serverAddress, serverPort, body, agentName);

  try {
    const stream = await (responsesCreate(body, options) as Promise<AsyncIterable<unknown>>);
    return wrapStream(stream, span, {
      startTime,
      operationName,
      serverAddress,
      serverPort,
    });
  } catch (error) {
    setErrorAttributes(span, error);
    span.setStatus({ status: "error", error: error instanceof Error ? error : undefined });
    span.end();
    const errorType =
      error instanceof Error
        ? error.name || error.constructor?.name || "Error"
        : "Error";
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

interface StreamMetricsContext {
  startTime: number;
  operationName: string;
  serverAddress?: string;
  serverPort?: number;
}

function wrapStream(
  innerStream: AsyncIterable<unknown>,
  span: TracingSpan,
  metricsCtx: StreamMetricsContext,
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
          span.setStatus({ status: "success" });
          span.end();
          recordStreamMetrics();
          return result;
        }
        // Check for response.completed event to capture final attributes
        const event = result.value as Record<string, unknown>;
        if (event?.type === "response.completed" && event.response) {
          completedResponse = event.response as OAIResponse;
          setResponseSpanAttributes(span, completedResponse);
        }
        return result;
      } catch (error) {
        setErrorAttributes(span, error);
        span.setStatus({ status: "error", error: error instanceof Error ? error : undefined });
        span.end();
        const errType =
          error instanceof Error
            ? error.name || error.constructor?.name || "Error"
            : "Error";
        recordStreamMetrics(errType);
        throw error;
      }
    },
    async return(value?: unknown) {
      span.setStatus({ status: "success" });
      span.end();
      recordStreamMetrics();
      if (iterator.return) {
        return iterator.return(value);
      }
      return { done: true, value: undefined };
    },
    async throw(error?: unknown) {
      setErrorAttributes(span, error);
      span.setStatus({ status: "error", error: error instanceof Error ? error : undefined });
      span.end();
      const errType =
        error instanceof Error
          ? error.name || error.constructor?.name || "Error"
          : "Error";
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
  (wrappedStream as Record<string | symbol, unknown>)[Symbol.asyncIterator] = () =>
    wrappedIterator;

  return wrappedStream;
}
