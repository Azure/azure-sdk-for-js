// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError, StreamableMethod } from "@azure-rest/core-client";
import { CreateRunParameters, CreateThreadAndRunBodyParam, SubmitToolOutputsToRunParameters } from "../generated/src/index.js";
import { AgentEventMessage, AgentEventMessageStream } from "./streamingModels.js";
import { createSseStream, EventMessageStream } from "@azure/core-sse";
import { isNodeLike } from "@azure/core-util";
import { IncomingMessage } from "http";

const expectedStatuses = ["200"];



function createAgentStream(stream: EventMessageStream): AgentEventMessageStream {
  const asyncIterator = toAsyncIterable(stream);
  const asyncDisposable = stream as AsyncDisposable;
  return Object.assign(asyncIterator, asyncDisposable);
}

async function* toAsyncIterable(stream: EventMessageStream): AsyncIterable<AgentEventMessage> {
  for await (const event of stream) {
    try {
      yield { data: JSON.parse(event.data), event: event.event }
    }
    catch {
      yield { data: event.data, event: event.event }
    }
  }
}

async function processStream(streamResponse: StreamableMethod): Promise<AgentEventMessageStream> {
  const result = isNodeLike ? await streamResponse.asNodeStream() : await streamResponse.asBrowserStream();

  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
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
  options.body.stream = true;

  return processStream(context
    .path("/threads/{threadId}/runs", threadId)
    .post(options));
}


/** Create a thread and run and stream the events */
export async function createThreadAndRunStreaming(
  context: Client,
  options: CreateThreadAndRunBodyParam,
): Promise<AgentEventMessageStream> {
  options.body.stream = true;
  return processStream(context
    .path("/threads/runs")
    .post(options));
}

export async function submitToolOutputsToRunStreaming(
  context: Client,
  threadId: string,
  runId: string,
  options: SubmitToolOutputsToRunParameters,
): Promise<AgentEventMessageStream> {
  options.body.stream = true;

  return processStream(context.path("/threads/{threadId}/runs/{runId}/submit_tool_outputs", threadId, runId)
    .post(options));
}
