// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client, StreamableMethod } from "@azure-rest/core-client";
import type {
  CreateRunParameters,
  CreateThreadAndRunBodyParam,
  SubmitToolOutputsToRunParameters,
} from "../generated/src/index.js";
import {
  MessageStreamEvent,
  RunStepStreamEvent,
  RunStreamEvent,
  ThreadStreamEvent,
  type AgentEventMessage,
  type AgentEventMessageStream,
  type AgentEventStreamDataOutput,
} from "./streamingModels.js";
import type { EventMessage, EventMessageStream } from "@azure/core-sse";
import { createSseStream } from "@azure/core-sse";
import { isNodeLike } from "@azure/core-util";
import type { IncomingMessage } from "http";
import {
  validateMessages,
  validateMetadata,
  validateRunId,
  validateThreadId,
  validateToolResources,
  validateTools,
  validateTruncationStrategy,
} from "./inputValidations.js";
import { createOpenAIError } from "./openAIError.js";
import {
  convertAgentThreadOutput,
  convertMessageDeltaChunkOutput,
  convertRunStepDeltaChunk,
  convertRunStepOutput,
  convertThreadMessageOutput,
  convertThreadRunOutput,
} from "../customization/convertOutputModelsFromWire.js";
import { logger } from "../logger.js";

const expectedStatuses = ["200"];

const handlers = [
  { events: Object.values(ThreadStreamEvent) as string[], converter: convertAgentThreadOutput },
  { events: Object.values(RunStreamEvent) as string[], converter: convertThreadRunOutput },
  { events: Object.values(RunStepStreamEvent) as string[], converter: convertRunStepOutput },
  { events: Object.values(MessageStreamEvent) as string[], converter: convertThreadMessageOutput },
];

function createAgentStream(stream: EventMessageStream): AgentEventMessageStream {
  const asyncIterator = toAsyncIterable(stream);
  const asyncDisposable = stream as AsyncDisposable;
  return Object.assign(asyncIterator, asyncDisposable);
}

async function* toAsyncIterable(stream: EventMessageStream): AsyncIterable<AgentEventMessage> {
  for await (const event of stream) {
    const data = deserializeEventData(event);
    yield { data: data, event: event.event };
  }
}

function deserializeEventData(event: EventMessage): AgentEventStreamDataOutput {
  try {
    const jsonData = JSON.parse(event.data);
    switch (event.event) {
      case MessageStreamEvent.ThreadMessageDelta:
        return convertMessageDeltaChunkOutput(jsonData);
      case RunStepStreamEvent.ThreadRunStepDelta:
        return convertRunStepDeltaChunk(jsonData);
      default: {
        for (const { events, converter } of handlers) {
          if (events.includes(event.event)) {
            return converter(jsonData);
          }
        }

        return jsonData;
      }
    }
  } catch (ex) {
    logger.error(`Failed to parse event data  ${event.event} - error: ${ex}`);
    return event.data;
  }
}

async function processStream(streamResponse: StreamableMethod): Promise<AgentEventMessageStream> {
  const result = isNodeLike
    ? await streamResponse.asNodeStream()
    : await streamResponse.asBrowserStream();

  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  if (!result.body) {
    throw new Error("No body in response");
  }

  const stream = isNodeLike
    ? createSseStream(result.body as IncomingMessage)
    : createSseStream(result.body as ReadableStream<Uint8Array>);
  return createAgentStream(stream);
}

/** Create a run and stream the events */
export async function createRunStreaming(
  context: Client,
  threadId: string,
  options: CreateRunParameters,
): Promise<AgentEventMessageStream> {
  validateThreadId(threadId);
  validateCreateThreadAndRunBodyParam(options);
  options.body.stream = true;

  return processStream(context.path("/threads/{threadId}/runs", threadId).post(options));
}

/** Create a thread and run and stream the events */
export async function createThreadAndRunStreaming(
  context: Client,
  options: CreateThreadAndRunBodyParam,
): Promise<AgentEventMessageStream> {
  validateCreateThreadAndRunBodyParam(options);
  options.body.stream = true;
  return processStream(context.path("/threads/runs").post(options));
}

export async function submitToolOutputsToRunStreaming(
  context: Client,
  threadId: string,
  runId: string,
  options: SubmitToolOutputsToRunParameters,
): Promise<AgentEventMessageStream> {
  validateThreadId(threadId);
  validateRunId(runId);
  options.body.stream = true;

  return processStream(
    context
      .path("/threads/{threadId}/runs/{runId}/submit_tool_outputs", threadId, runId)
      .post(options),
  );
}

function validateCreateThreadAndRunBodyParam(
  options: CreateRunParameters | CreateThreadAndRunBodyParam,
): void {
  if ("additional_messages" in options.body && options.body.additional_messages) {
    options.body.additional_messages.forEach((message) => validateMessages(message.role));
  }
  if ("thread" in options.body && options.body.thread?.messages) {
    options.body.thread?.messages.forEach((message) => validateMessages(message.role));
  }
  if (options.body.tools) {
    validateTools(options.body.tools);
  }
  if ("tool_resources" in options.body && options?.body.tool_resources) {
    validateToolResources(options.body.tool_resources);
  }
  if (options.body.temperature && (options.body.temperature < 0 || options.body.temperature > 2)) {
    throw new Error("Temperature must be between 0 and 2");
  }
  if (options.body.tool_choice && typeof options.body.tool_choice !== "string") {
    validateTools([options.body.tool_choice]);
  }
  if (options.body.truncation_strategy?.type) {
    validateTruncationStrategy(options.body.truncation_strategy.type);
  }
  if (options.body.response_format) {
    if (!["json", "text"].includes(options.body.response_format as string)) {
      throw new Error("Response format must be either 'json' or 'text'");
    }
  }
  if (options?.body.metadata) {
    validateMetadata(options.body.metadata);
  }
}
