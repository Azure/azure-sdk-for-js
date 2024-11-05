// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { ProjectsClient } from "../generated/src/clientDefinitions.js";
import { CreateRunParameters, CreateThreadAndRunBodyParam } from "../generated/src/index.js";

const expectedStatuses = ["200"];

export interface AgentStreamEventMessage {
  data: any;
  eventType: string;
}
// export interface AgentStreamMessage {
//   data: string | ThreadMessageOutput | ThreadRunOutput | RunStepOutput | {};
//   eventType: string;
// }

// export enum AgentStreamEventType {
//   ThreadRunCreated = "thread.run.created",
//   ThreadRunQueued = "thread.run.queued",
//   ThreadRunInProgress = "thread.run.in_progress",
//   ThreadRunStepCreated = "thread.run.step.created",
//   ThreadRunStepInProgress = "thread.run.step.in_progress",
//   ThreadMessageCreated = "thread.message.created",
//   ThreadMessageInProgress = "thread.message.in_progress",
//   ThreadMessageDelta = "thread.message.delta",
//   ThreadMessageCompleted = "thread.message.completed",
//   ThreadRunStepCompleted = "thread.run.step.completed",
//   ThreadRunCompleted = "thread.run.completed",

// }
export async function* createRunStreaming(
  context: Client,
  threadId: string,
  options: CreateRunParameters,
): AsyncIterable<AgentStreamEventMessage> {
  options.body.stream = true;
  const result = await (context as ProjectsClient)
    .path("/threads/{threadId}/runs", threadId)
    .post(options)
    .asBrowserStream();

  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  if (!result.body) {
    throw new Error("No body in response");
  }

  let buffer = "";
  const decoder = new TextDecoder("utf-8");
  for await (const chunk of result.body) {
    buffer += decoder.decode(chunk, { stream: true });
    if (buffer.includes("\n")) {
      const lines = buffer.split("\n\n");
      for (let i = 0; i < lines.length - 1; i++) {
        const streamData = parseLine(lines[i]);
        if (streamData) {
          yield streamData;
        }
      }
      buffer = lines[lines.length - 1];
    }
  }
}

export async function* createThreadAndRunStreaming(
  context: Client,
  options: CreateThreadAndRunBodyParam,
): AsyncIterable<AgentStreamEventMessage> {
    options.body.stream = true;
    const result = await (context as ProjectsClient)
      .path("/threads/runs")
      .post(options)
      .asBrowserStream();
  
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    if (!result.body) {
      throw new Error("No body in response");
    }
  
    let buffer = "";
    const decoder = new TextDecoder("utf-8");
    for await (const chunk of result.body) {
      buffer += decoder.decode(chunk, { stream: true });
      if (buffer.includes("\n")) {
        const lines = buffer.split("\n\n");
        for (let i = 0; i < lines.length - 1; i++) {
          const streamData = parseLine(lines[i]);
          if (streamData) {
            yield streamData;
          }
        }
        buffer = lines[lines.length - 1];
      }
    }
}

function parseLine(line: string): AgentStreamEventMessage | undefined {
  const streamData: AgentStreamEventMessage = { data: {}, eventType: "" };
  const trimmedLine = line.trim();

  if (trimmedLine.length > 0) {
    trimmedLine.split("\n").forEach((l) => {
      const trimmedL = l.trim();
      const colIndex = trimmedL.indexOf(":");

      if (colIndex !== -1) {
        const fieldName = trimmedL.substring(0, colIndex).trim();
        const fieldValue = trimmedL.substring(colIndex + 1).trim();

        switch (fieldName) {
          case "data":
            try {
              streamData.data = JSON.parse(fieldValue);
            } catch {
              streamData.data = fieldValue;
            }
            break;
          case "event":
            if (fieldValue !== "done") {
              streamData.eventType = fieldValue;
            }
            break;
        }
      }
    });
  }

  return streamData.eventType ? streamData : undefined;
}
