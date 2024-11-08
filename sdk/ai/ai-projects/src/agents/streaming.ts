// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError, HttpBrowserStreamResponse } from "@azure-rest/core-client";
import { ProjectsClient } from "../generated/src/clientDefinitions.js";
import { CreateRunParameters, CreateThreadAndRunBodyParam } from "../generated/src/index.js";
import { AgentStreamEventMessage } from "./streamingModels.js";
import { createSseStream } from "@azure/core-sse";

const expectedStatuses = ["200"];


async function* processStream(result: HttpBrowserStreamResponse): AsyncIterable<AgentStreamEventMessage> {
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  if (!result.body) {
    throw new Error("No body in response");
  }

  const stream =  createSseStream(result.body);
  for await (const event of stream) {
    try{
      yield {data: JSON.parse(event.data), event: event.event}
    }
    catch{
      yield {data: event.data, event: event.event}
    }
  }
}

/** Create a run and stream the events */
export async function* createRunStreaming(
  context: Client,
  threadId: string,
  options: CreateRunParameters,
): AsyncIterable<AgentStreamEventMessage>  {
  options.body.stream = true;
  const response = await (context as ProjectsClient)
    .path("/threads/{threadId}/runs", threadId)
    .post(options)
    .asBrowserStream();
  
    yield* processStream(response);
}

/** Create a thread and run and stream the events */
export async function* createThreadAndRunStreaming(
  context: Client,
  options: CreateThreadAndRunBodyParam,
): AsyncIterable<AgentStreamEventMessage> {
  options.body.stream = true;
  const response = await (context as ProjectsClient)
    .path("/threads/runs")
    .post(options)
    .asBrowserStream();

  yield* processStream(response);
}


