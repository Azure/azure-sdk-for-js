// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Gets a single knowledge base by name from a Discovery Bookshelf resource.
 */

import { BookshelfClient } from "@azure/ai-discovery";
import { DefaultAzureCredential } from "@azure/identity";
// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint =
    process.env["DISCOVERY_BOOKSHELF_ENDPOINT"] ?? "https://bookshelf.discovery.microsoft.com";
  const knowledgeBaseName = process.env["DISCOVERY_KNOWLEDGE_BASE_NAME"] ?? "my-knowledge-base";
  const credential = new DefaultAzureCredential();
  const client = new BookshelfClient(endpoint, credential);

  const knowledgeBase = await client.knowledgeBases.get(knowledgeBaseName);
  console.log(
    `Knowledge base '${knowledgeBase.name}' provisioning state: ${knowledgeBase.provisioningState}`,
  );
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
