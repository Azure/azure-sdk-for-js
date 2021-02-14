// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");
require("dotenv").config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
  console.log(`Running List SynonymMaps Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfSynonymMaps = await client.listSynonymMaps();

  console.log(`List of SynonymMaps`);
  console.log(`*******************`);
  for(const sm of listOfSynonymMaps) {
    console.log(`Name: ${sm.name}`);
    console.log(`Synonyms`);
    for(const synonym of sm.synonyms) {
      console.log(synonym);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
