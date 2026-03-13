// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to do Create/Read/Update/Delete (CRUD) operations on Agent conversations
 * using the openAIClient.
 *
 * @summary demonstrates how to use basic conversation operations.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");

require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const openAIClient = project.getOpenAIClient();

  // Create conversations
  const conversation1 = await openAIClient.conversations.create();
  console.log(`Created conversation (id: ${conversation1.id})`);

  const conversation2 = await openAIClient.conversations.create();
  console.log(`Created conversation (id: ${conversation2.id})`);

  // Get conversation
  const conversation = await openAIClient.conversations.retrieve(conversation1.id);
  console.log(
    `Got conversation (id: ${conversation.id}, metadata: ${JSON.stringify(conversation.metadata)})`,
  );

  // Update conversation
  await openAIClient.conversations.update(conversation1.id, { metadata: { key: "value" } });
  console.log("Conversation updated");

  const updatedConversation = await openAIClient.conversations.retrieve(conversation1.id);
  console.log(
    `Got updated conversation (id: ${updatedConversation.id}, metadata: ${JSON.stringify(updatedConversation.metadata)})`,
  );

  // Delete conversation
  const result1 = await openAIClient.conversations.delete(conversation1.id);
  console.log(`Conversation deleted (id: ${result1.id}, deleted: ${result1.deleted})`);
  const result2 = await openAIClient.conversations.delete(conversation2.id);
  console.log(`Conversation deleted (id: ${result2.id}, deleted: ${result2.deleted})`);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
