// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SearchIndexClient, AzureKeyCredential } from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main(): Promise<void> {
  console.log(`Running List SynonymMap Names Sample....`);

  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfSynonymMapsNames: string[] = await client.listSynonymMapsNames();

  console.log(`List of SynonymMap Names`);
  console.log(`************************`);
  for (let smName of listOfSynonymMapsNames) {
    console.log(`${smName}`);
  }
}

main();
