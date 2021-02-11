// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SearchIndexerClient, AzureKeyCredential } from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

export async function main() {
  console.log(`Running List Indexer Names Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfIndexerNames: string[] = await client.listIndexersNames();

  console.log(`\tNames of Indexers`);
  console.log(`\t*****************`);
  for (let indexerName of listOfIndexerNames) {
    console.log(`${indexerName}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
