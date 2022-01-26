// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates the DataSource Connection Operations.
 */

import {
  SearchIndexerClient,
  AzureKeyCredential,
  SearchIndexerDataSourceConnection
} from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const apiKey = process.env.SEARCH_API_ADMIN_KEY || "";
const connectionString = process.env.CONNECTION_STRING || "";
const dataSourceConnectionName = "example-ds-connection-sample-1";

async function createDataSourceConnection(
  dataSourceConnectionName: string,
  client: SearchIndexerClient
) {
  console.log(`Creating DS Connection Operation`);
  const dataSourceConnection: SearchIndexerDataSourceConnection = {
    name: dataSourceConnectionName,
    description: "My Data Source 1",
    type: "cosmosdb",
    container: {
      name: "my-container-1"
    },
    connectionString
  };
  await client.createDataSourceConnection(dataSourceConnection);
}

async function getAndUpdateDataSourceConnection(
  dataSourceConnectionName: string,
  client: SearchIndexerClient
) {
  console.log(`Get And Update DS Connection Operation`);
  const ds: SearchIndexerDataSourceConnection = await client.getDataSourceConnection(
    dataSourceConnectionName
  );
  ds.container.name = "Listings_5K_KingCounty_WA";
  console.log(`Updating Container Name of Datasource Connection ${dataSourceConnectionName}`);
  await client.createOrUpdateDataSourceConnection(ds);
}

async function listDataSourceConnections(client: SearchIndexerClient) {
  console.log(`List DS Connection Operation`);
  const listOfDataSourceConnections: Array<SearchIndexerDataSourceConnection> = await client.listDataSourceConnections();

  console.log(`List of Data Source Connections`);
  console.log(`*******************************`);
  for (let ds of listOfDataSourceConnections) {
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

async function deleteDataSourceConnection(
  dataSourceConnectionName: string,
  client: SearchIndexerClient
) {
  console.log(`Deleting DS Connection Operation`);
  await client.deleteDataSourceConnection(dataSourceConnectionName);
}

async function main() {
  console.log(`Running DS Connection Operations Sample....`);
  if (!endpoint || !apiKey || !connectionString) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  try {
    await createDataSourceConnection(dataSourceConnectionName, client);
    await getAndUpdateDataSourceConnection(dataSourceConnectionName, client);
    await listDataSourceConnections(client);
  } finally {
    await deleteDataSourceConnection(dataSourceConnectionName, client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
