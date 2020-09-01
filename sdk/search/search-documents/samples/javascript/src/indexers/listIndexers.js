// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { SearchIndexerClient, AzureKeyCredential } = require("@azure/search-documents");
require("dotenv").config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
  console.log(`Running List Indexers Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfIndexers = await client.listIndexers();

  console.log(`\tList of Indexers`);
  console.log(`\t****************`);
  for(const indexer of listOfIndexers) {
    console.log(`Name: ${indexer.name}`);
    console.log(`Description: ${indexer.description}`);
    console.log(`Data Source Name: ${indexer.dataSourceName}`);
    console.log(`Skillset Name: ${indexer.skillsetName}`);
    console.log(`Target Index Name: ${indexer.targetIndexName}`);
    console.log(`Is Disabled: ${indexer.isDisabled}`);
    console.log(`ETag: ${indexer.etag}`);
    console.log();
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
