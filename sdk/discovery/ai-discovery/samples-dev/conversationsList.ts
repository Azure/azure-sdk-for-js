// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Lists conversations in a Discovery Workspace resource.
 */

import { WorkspaceClient } from "@azure/ai-discovery";
import { DefaultAzureCredential } from "@azure/identity";
// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint =
    process.env["DISCOVERY_WORKSPACE_ENDPOINT"] ?? "https://workspace.discovery.microsoft.com";
  const credential = new DefaultAzureCredential();
  const client = new WorkspaceClient(endpoint, credential);

  const conversations = await client.conversations.list();
  for (const conversation of conversations.value) {
    console.log(`Conversation: ${conversation.name}`);
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
