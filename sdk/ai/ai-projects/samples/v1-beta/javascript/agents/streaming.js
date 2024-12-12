// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations in streaming from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations in streaming.
 */

const {
  AIProjectsClient,
  DoneEvent,
  ErrorEvent,
  MessageStreamEvent,
  RunStreamEvent,
} = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");

require("dotenv").config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] ||
  "<endpoint>>;<subscription>;<resource group>;<project>";

async function main() {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  const agent = await client.agents.createAgent("gpt-4-1106-preview", {
    name: "my-assistant",
    instructions: "You are helpful agent",
  });

  console.log(`Created agent, agent ID : ${agent.id}`);

  const thread = await client.agents.createThread();

  console.log(`Created thread, thread ID : ${agent.id}`);

  await client.agents.createMessage(thread.id, { role: "user", content: "Hello, tell me a joke" });

  console.log(`Created message, thread ID : ${agent.id}`);

  const streamEventMessages = await client.agents.createRun(thread.id, agent.id).stream();

  for await (const eventMessage of streamEventMessages) {
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

  await client.agents.deleteAgent(agent.id);
  console.log(`Delete agent, agent ID : ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
