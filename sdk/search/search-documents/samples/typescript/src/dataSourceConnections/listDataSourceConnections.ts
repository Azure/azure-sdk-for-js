// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SearchIndexerClient,
  AzureKeyCredential,
  SearchIndexerDataSourceConnection
} from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main(): Promise<void> {
  console.log(`Running List Datasource Connections Sample....`);

  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
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

main();
