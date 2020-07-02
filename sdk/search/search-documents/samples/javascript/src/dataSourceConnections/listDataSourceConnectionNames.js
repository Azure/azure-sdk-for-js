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
  console.log(`Running List Datasource Connection Names Sample....`);

  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfDataSourceConnectionNames = await client.listDataSourceConnectionsNames();

  console.log(`Names of Data Source Connections`);
  console.log(`*******************************`);
  for(let ds of listOfDataSourceConnectionNames) {
    console.log(ds);
  }
}

main();
