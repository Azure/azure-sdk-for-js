// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { SearchIndexerClient, AzureKeyCredential } = require("@azure/search-documents");
require("dotenv").config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
  console.log(`Running List Indexer Names Sample....`);

  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfIndexerNames = await client.listIndexersNames();

  console.log(`\tNames of Indexers`);
  console.log(`\t*****************`);
  for(let indexerName of listOfIndexerNames) {
    console.log(`${indexerName}`);
  }
}

main();
