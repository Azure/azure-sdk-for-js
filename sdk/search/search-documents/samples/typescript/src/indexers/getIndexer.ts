// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SearchIndexerClient, AzureKeyCredential, SearchIndexer } from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

export async function main() {
  console.log(`Running Get Indexer Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  console.log(`Getting Indexer my-azure-indexer-1`);
  const indexer: SearchIndexer = await client.getIndexer("my-azure-indexer-1");
  console.log(`Name: ${indexer.name}`);
  console.log(`Description: ${indexer.description}`);
  console.log(`Data Source Name: ${indexer.dataSourceName}`);
  console.log(`Skillset Name: ${indexer.skillsetName}`);
  console.log(`Target Index Name: ${indexer.targetIndexName}`);
  console.log(`Indexing Schedule`);
  console.log(`\tInterval: ${indexer.schedule?.interval}`);
  console.log(`\tStart Time: ${indexer.schedule?.startTime}`);
  console.log(`Is Disabled: ${indexer.isDisabled}`);
  console.log(`ETag: ${indexer.etag}`);
  console.log(`Parameters`);
  console.log(`\tBatch Size: ${indexer.parameters?.batchSize}`);
  console.log(`\tMax Failed Items: ${indexer.parameters?.maxFailedItems}`);
  console.log(`\tMax Failed Items Per Batch: ${indexer.parameters?.maxFailedItemsPerBatch}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
