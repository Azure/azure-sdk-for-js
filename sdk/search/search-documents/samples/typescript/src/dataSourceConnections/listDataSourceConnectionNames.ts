// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SearchIndexerClient, AzureKeyCredential } from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main(): Promise<void> {
  console.log(`Running List Datasource Connection Names Sample....`);

  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfDataSourceConnectionNames: string[] = await client.listDataSourceConnectionsNames();

  console.log(`Names of Data Source Connections`);
  console.log(`*******************************`);
  for (let ds of listOfDataSourceConnectionNames) {
    console.log(ds);
  }
}

main();
