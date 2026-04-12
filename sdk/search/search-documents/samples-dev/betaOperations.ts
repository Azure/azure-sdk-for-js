// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to use enableBeta() to access preview operations.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { SearchIndexClient } from "@azure/search-documents";
import "dotenv/config";

const endpoint = process.env.ENDPOINT || "";

async function usePreviewOperations(): Promise<void> {
  // Activate preview operations on this client instance.
  // enableBeta() returns the same instance with a wider type that includes
  // preview-only operations such as alias management, knowledge base
  // operations, and index statistics summary.
  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential()).enableBeta();

  // Preview-only: list all search index aliases
  console.log("Listing aliases (preview operation):");
  for await (const alias of client.listAliases()) {
    console.log(`  Alias: ${alias.name} -> [${alias.indexes.join(", ")}]`);
  }

  // Preview-only: get aggregated index statistics summary
  console.log(`\nIndex stats summary (preview operation):`);
  for await (const stat of client.getIndexStatsSummary()) {
    console.log(`  vectorIndexSize: ${stat.vectorIndexSize}`);
  }
}

async function main(): Promise<void> {
  console.log(`Running Beta Operations Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid endpoint with proper authorization.");
    return;
  }
  await usePreviewOperations();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
