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
  console.log(`Running CreateOrUpdate Datasource Connection Sample....`);
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  console.log(`Get Datasource Connection my-data-source-2`);
  const ds:SearchIndexerDataSourceConnection = await client.getDataSourceConnection("my-data-source-2")
  ds.container.name = "Listings_5K_KingCounty_WA";
  console.log(`Updating Container Name of Datasource Connection my-data-source-2`);
  await client.createOrUpdateDataSourceConnection(ds);
}

main();
