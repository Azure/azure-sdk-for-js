// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SearchIndexClient,
  AzureKeyCredential,
  SearchIndexStatistics
} from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main(): Promise<void> {
  console.log(`Running Get Index Statistics Sample....`);

  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  console.log(`Get Index Statistics of example-index`);
  const statistics:SearchIndexStatistics = await client.getIndexStatistics("example-index");
  console.log(`Document Count: ${statistics.documentCount}`);
  console.log(`Storage Size: ${statistics.storageSize}`);
}

main();
