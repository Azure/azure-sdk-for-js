// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic conversation operations.
 *
 * @summary This sample demonstrates how to create, retrieve,
 * update, list, and delete conversations using the OpenAI client.
 *
 */

import OpenAI from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["OPENAI_AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";

export async function main(): Promise<void> {
  // Create OpenAI client with Azure credentials
  const credential = new DefaultAzureCredential();
  const scope = "https://ai.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(credential, scope);

  const openAIClient = new OpenAI({
    apiKey: await azureADTokenProvider(),
    baseURL: projectEndpoint,
    defaultQuery: { "api-version": "2025-11-15-preview" },
  });

  console.log("Creating a conversation...");
  const conversation = await openAIClient.conversations.create();
  console.log(`Created conversation, ID: ${conversation.id}`);

  console.log("\nRetrieving the conversation...");
  const retrieved = await openAIClient.conversations.retrieve(conversation.id);
  console.log(`Retrieved conversation, ID: ${retrieved.id}`);
  console.log(`Created at: ${new Date(retrieved.created_at * 1000).toISOString()}`);

  console.log("\nUpdating the conversation with metadata...");
  const metadata: Record<string, string> = {
    key: "value",
    department: "engineering",
    priority: "high",
  };
  const updated = await openAIClient.conversations.update(conversation.id, {
    metadata,
  });
  console.log(`Updated conversation, ID: ${updated.id}`);
  console.log(`Metadata: ${JSON.stringify(updated.metadata, null, 2)}`);

  console.log("\nRetrieving the updated conversation to verify metadata...");
  const updatedRetrieved = await openAIClient.conversations.retrieve(conversation.id);
  console.log(`Conversation ID: ${updatedRetrieved.id}`);
  console.log(`Metadata: ${JSON.stringify(updatedRetrieved.metadata, null, 2)}`);

  console.log("\nCreating another conversation with initial items...");
  const conversationItem: any = {
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "Hello, how are you?" }],
  };
  const conversation2 = await openAIClient.conversations.create({
    items: [conversationItem],
  });
  console.log(`Created conversation with items, ID: ${conversation2.id}`);

  console.log("\nDeleting conversations...");
  const deleted1 = await openAIClient.conversations.delete(conversation.id);
  console.log(`Deleted conversation, ID: ${deleted1.id}`);

  const deleted2 = await openAIClient.conversations.delete(conversation2.id);
  console.log(`Deleted conversation, ID: ${deleted2.id}`);

  console.log("\nAll conversations have been deleted.");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
