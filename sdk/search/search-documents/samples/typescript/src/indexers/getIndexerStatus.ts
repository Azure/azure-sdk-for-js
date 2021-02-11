// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SearchIndexerClient, AzureKeyCredential, SearchIndexerStatus } from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

export async function main() {
  console.log(`Running Get Indexer Status Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  console.log(`Getting Indexer Status of my-azure-indexer-1`);
  const indexerStatus: SearchIndexerStatus = await client.getIndexerStatus("my-azure-indexer-1");
  console.log(`Status: ${indexerStatus.status}`);
  console.log(`Limits`);
  console.log(`******`);
  console.log(`MaxDocumentContentCharactersToExtract: ${indexerStatus.limits.maxDocumentContentCharactersToExtract}`)
  console.log(`MaxDocumentExtractionSize: ${indexerStatus.limits.maxDocumentExtractionSize}`)
  console.log(`MaxRunTime: ${indexerStatus.limits.maxRunTime}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
