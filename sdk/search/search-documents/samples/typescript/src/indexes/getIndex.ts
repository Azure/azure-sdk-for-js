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

export async function main() {
  console.log(`Running Get Index Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  console.log(`Get Index example-index`);
  const index:SearchIndex = await client.getIndex("example-index");
  console.log(`Name: ${index.name}`);
  console.log(`Similarity Algorithm: ${index.similarity?.odatatype}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
