// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SearchIndexerClient, AzureKeyCredential, SearchIndexer } from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main(): Promise<void> {
  console.log(`Running Create Or Update Indexer Sample....`);

  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  console.log(`Getting Indexer my-azure-indexer-1`);
  const indexer: SearchIndexer = await client.getIndexer("my-azure-indexer-1");
  console.log(`Updating isDisabled status of Indexer my-azure-indexer-1`);
  indexer.isDisabled = true;
  await client.createOrUpdateIndexer(indexer);
}

main();
