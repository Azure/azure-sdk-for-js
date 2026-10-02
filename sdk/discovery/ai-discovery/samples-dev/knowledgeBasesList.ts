// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Lists the knowledge bases available in a Discovery Bookshelf resource.
 */

import { BookshelfClient } from "@azure/ai-discovery";
import { DefaultAzureCredential } from "@azure/identity";
// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  // DefaultAzureCredential supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme for more information.
  const endpoint =
    process.env["DISCOVERY_BOOKSHELF_ENDPOINT"] ?? "https://bookshelf.discovery.microsoft.com";
  const credential = new DefaultAzureCredential();
  const client = new BookshelfClient(endpoint, credential);

  for await (const knowledgeBase of client.knowledgeBases.list()) {
    console.log(`Knowledge base: ${knowledgeBase.name}`);
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
