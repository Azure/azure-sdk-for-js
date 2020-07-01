// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SearchIndexClient,
  AzureKeyCredential,
  SearchIndex
} from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main(): Promise<void> {
  console.log(`Running Delete Index Sample....`);

  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  console.log(`Get Index example-index-2`);
  const index:SearchIndex = await client.getIndex("example-index-2");
  console.log(`Deleting Index example-index-2`);
  await client.deleteIndex(index);
}

main();
