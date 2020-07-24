// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");
require("dotenv").config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
  console.log(`Running List SynonymMap Names Sample....`);

  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfSynonymMapsNames = await client.listSynonymMapsNames();

  console.log(`List of SynonymMap Names`);
  console.log(`************************`);
  for(let smName of listOfSynonymMapsNames) {
    console.log(`${smName}`);
  }
}

main();
