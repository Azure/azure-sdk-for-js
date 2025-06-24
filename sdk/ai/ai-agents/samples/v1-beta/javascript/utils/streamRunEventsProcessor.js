// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to process stream run events from the Azure AI Agents.
 */

const { DoneEvent, ErrorEvent, MessageStreamEvent, RunStreamEvent } = require("@azure/ai-agents");

async function streamRunEventsProcessor(streamMessages) {
  for await (const eventMessage of streamMessages) {
    switch (eventMessage.event) {
      case RunStreamEvent.ThreadRunCreated:
        console.log(`ThreadRun status: ${eventMessage.data.status}`);
        break;
      case MessageStreamEvent.ThreadMessageDelta:
        {
          const messageDelta = eventMessage.data;
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

module.exports = { streamRunEventsProcessor };
