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
  console.log(`Running Create Datasource Connection Sample....`);

  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  const dataSourceConnection = {
    name: "my-data-source-2",
    description: "My Data Source 1",
    type: "cosmosdb",
    container: {
      name: "my-container-1"
    },
    connectionString:
      "AccountEndpoint=https://hotels-docbb.documents.azure.com:443/;AccountKey=4UPsNZyFAjgZ1tzHPGZaxS09XcwLrIawbXBWk6IixcxJoSePTcjBn0mi53XiKWu8MaUgowUhIovOv7kjksqAug==;Database=SampleData"
  };
  await client.createDataSourceConnection(dataSourceConnection);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
