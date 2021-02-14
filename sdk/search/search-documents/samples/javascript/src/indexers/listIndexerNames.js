// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { SearchIndexerClient, AzureKeyCredential } = require("@azure/search-documents");
require("dotenv").config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
  console.log(`Running List Indexer Names Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfIndexerNames = await client.listIndexersNames();

  console.log(`\tNames of Indexers`);
  console.log(`\t*****************`);
  for(const indexerName of listOfIndexerNames) {
    console.log(`${indexerName}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
