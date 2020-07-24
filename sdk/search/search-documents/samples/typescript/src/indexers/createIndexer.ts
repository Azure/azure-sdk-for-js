// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SearchIndexerClient, AzureKeyCredential, SearchIndexer } from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main(): Promise<void> {
  console.log(`Running Create Indexer Sample....`);

  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  const indexer: SearchIndexer = {
    name: "my-azure-indexer-1",
    description: "Description for Sample Indexer",
    dataSourceName: "realestate-us-sample",
    targetIndexName: "realestate-us-sample-index",
    isDisabled: false
  };

  await client.createIndexer(indexer);
}

main();
