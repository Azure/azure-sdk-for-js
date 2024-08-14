// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates the DataSource Connection Operations.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SearchIndexerClient } = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const connectionString = process.env.CONNECTION_STRING || "";
const TEST_DATA_SOURCE_CONNECTION_NAME = "example-ds-connection-sample-1";

async function createDataSourceConnection(dataSourceConnectionName, client) {
  console.log(`Creating DS Connection Operation`);
  const dataSourceConnection = {
    name: dataSourceConnectionName,
    description: "My Data Source 1",
    type: "cosmosdb",
    container: {
      name: "my-container-1",
    },
    connectionString,
  };
  await client.createDataSourceConnection(dataSourceConnection);
}

async function getAndUpdateDataSourceConnection(dataSourceConnectionName, client) {
  console.log(`Get And Update DS Connection Operation`);
  const ds = await client.getDataSourceConnection(dataSourceConnectionName);
  ds.container.name = "Listings_5K_KingCounty_WA";
  console.log(`Updating Container Name of Datasource Connection ${dataSourceConnectionName}`);
  await client.createOrUpdateDataSourceConnection(ds);
}

async function listDataSourceConnections(client) {
  console.log(`List DS Connection Operation`);
  const listOfDataSourceConnections = await client.listDataSourceConnections();

  console.log(`List of Data Source Connections`);
  console.log(`*******************************`);
  for (const ds of listOfDataSourceConnections) {
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
}

async function deleteDataSourceConnection(dataSourceConnectionName, client) {
  console.log(`Deleting DS Connection Operation`);
  await client.deleteDataSourceConnection(dataSourceConnectionName);
}

async function main() {
  console.log(`Running DS Connection Operations Sample....`);
  if (!endpoint || !connectionString) {
    console.log("Be sure to set a valid endpoint with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new DefaultAzureCredential());
  try {
    await createDataSourceConnection(TEST_DATA_SOURCE_CONNECTION_NAME, client);
    await getAndUpdateDataSourceConnection(TEST_DATA_SOURCE_CONNECTION_NAME, client);
    await listDataSourceConnections(client);
  } finally {
    await deleteDataSourceConnection(TEST_DATA_SOURCE_CONNECTION_NAME, client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
