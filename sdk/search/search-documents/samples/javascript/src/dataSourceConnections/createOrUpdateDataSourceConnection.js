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
  console.log(`Running CreateOrUpdate Datasource Connection Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  console.log(`Get Datasource Connection my-data-source-2`);
  const ds = await client.getDataSourceConnection("my-data-source-2")
  ds.container.name = "Listings_5K_KingCounty_WA";
  console.log(`Updating Container Name of Datasource Connection my-data-source-2`);
  await client.createOrUpdateDataSourceConnection(ds);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
