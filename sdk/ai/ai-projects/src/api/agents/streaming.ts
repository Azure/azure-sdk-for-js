// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StreamableMethod } from "@azure-rest/core-client";
import {
  ThreadStreamEvent,
  type AgentEventMessage,
  type AgentEventMessageStream,
  type AgentEventStreamData,
} from "./streamingModels.js";

import { 
  MessageStreamEventEnum,
  RunStepStreamEventEnum,
  RunStreamEventEnum,
} from "./customModels.js";
import type { EventMessage, EventMessageStream } from "@azure/core-sse";
import { createSseStream } from "@azure/core-sse";
import { isNodeLike } from "@azure/core-util";
import type { IncomingMessage } from "http";

import { createOpenAIError } from "./openAIError.js";
import { logger } from "../../logger.js";

const expectedStatuses = ["200"];

const handlers = [
  { events: Object.values(ThreadStreamEvent) as string[] },
  { events: Object.values(RunStreamEventEnum) as string[] },
  { events: Object.values(RunStepStreamEventEnum) as string[] },
  { events: Object.values(MessageStreamEventEnum) as string[] },
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

function deserializeEventData(event: EventMessage): AgentEventStreamData {
  try {
    const jsonData = JSON.parse(event.data);
    switch (event.event) {
      case MessageStreamEventEnum.ThreadMessageDelta:
        return jsonData;
      case RunStepStreamEventEnum.ThreadRunStepDelta:
        return jsonData;
      default: {
        for (const { events } of handlers) {
          if (events.includes(event.event)) {
            return jsonData;
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

export async function processStream(streamResponse: StreamableMethod): Promise<AgentEventMessageStream> {
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
