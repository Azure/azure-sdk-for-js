// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { SearchIndexerClient, AzureKeyCredential } = require("@azure/search-documents");
require("dotenv").config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
  console.log(`Running Create Or Update Indexer Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  console.log(`Getting Indexer my-azure-indexer-1`);
  const indexer = await client.getIndexer("my-azure-indexer-1");
  console.log(`Updating isDisabled status of Indexer my-azure-indexer-1`);
  indexer.isDisabled = true;
  await client.createOrUpdateIndexer(indexer);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
