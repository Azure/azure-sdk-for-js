// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const {
  SearchIndexerClient,
  AzureKeyCredential
} = require("@azure/search-documents");
require("dotenv").config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
  console.log(`Running Get Datasource Connection Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  console.log(`Get Datasource Connection my-data-source-2`);
  const ds = await client.getDataSourceConnection("my-data-source-2")
  console.log(`Name: ${ds.name}`);
  console.log(`Description: ${ds.description}`);
  console.log(`Connection String: ${ds.connectionString}`);
  console.log(`Data Change Detection Policy: ${ds.dataChangeDetectionPolicy}`);
  console.log(`Data Deletion Detection Policy: ${ds.dataDeletionDetectionPolicy}`);
  console.log(`Etag: ${ds.etag}`);
  console.log(`DataContainer`);
  console.log(`\tName: ${ds.container.name}`);
  console.log(`\tQuery: ${ds.container.query}`);
  console.log();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
