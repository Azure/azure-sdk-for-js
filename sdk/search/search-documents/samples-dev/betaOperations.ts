// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates using the beta import to access preview operations.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { SearchIndexClient } from "@azure/search-documents";
// Side-effect import that activates preview operations.
// Must be imported before creating any client instances.
import "@azure/search-documents/beta";
import "dotenv/config";

const endpoint = process.env.ENDPOINT || "";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential);

  // Preview operations are now available on the client
  const aliases = client.listAliases();
  for await (const alias of aliases) {
    console.log(`Alias: ${alias.name}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
