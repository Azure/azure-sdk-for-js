// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SearchIndexClient, AzureKeyCredential, SynonymMap } from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main(): Promise<void> {
  console.log(`Running List SynonymMaps Sample....`);

  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfSynonymMaps: Array<SynonymMap> = await client.listSynonymMaps();

  console.log(`List of SynonymMaps`);
  console.log(`*******************`);
  for (let sm of listOfSynonymMaps) {
    console.log(`Name: ${sm.name}`);
    console.log(`Synonyms`);
    for (let synonym of sm.synonyms) {
      console.log(synonym);
    }
  }
}

main();
