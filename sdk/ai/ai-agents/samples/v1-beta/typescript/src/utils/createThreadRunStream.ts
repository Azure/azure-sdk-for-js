// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates a thread run stream and processes the events.
 */
import {
  AgentsClient,
  MessageStreamEvent,
  RunStreamEvent,
  ErrorEvent,
  DoneEvent,
  MessageDeltaChunk,
} from "@azure/ai-agents";
import { parseString } from "./parseString.js";

export async function createThreadRunStream(
  client: AgentsClient,
  agentId: string,
  threadId: string,
): Promise<void> {
  const streamEventMessages = await client.runs.create(threadId, agentId).stream();

  for await (const eventMessage of streamEventMessages) {
    switch (eventMessage.event) {
      case RunStreamEvent.ThreadRunCreated:
        console.log(`ThreadRun status: ${eventMessage.data.status}`);
        break;
      case MessageStreamEvent.ThreadMessageDelta:
        {
          const messageDelta = parseString<MessageDeltaChunk>(eventMessage.data);

          messageDelta.delta.content.forEach((contentPart) => {
            if (contentPart.type === "text") {
              const textContent = contentPart;
              const textValue = textContent.text?.value || "No text";
              console.log(`Text delta received:: ${textValue}`);
            }
          });
        }
        break;
      case RunStreamEvent.ThreadRunCompleted:
        console.log("Thread Run Completed");
        break;
      case ErrorEvent.Error:
        console.log(`An error occurred. Data ${eventMessage.data}`);
        break;
      case DoneEvent.Done:
        console.log("Stream completed.");
        break;
    }
  }
}
