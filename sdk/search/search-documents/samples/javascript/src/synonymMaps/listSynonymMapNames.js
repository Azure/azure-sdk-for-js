// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");
require("dotenv").config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
  console.log(`Running List SynonymMap Names Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfSynonymMapsNames = await client.listSynonymMapsNames();

  console.log(`List of SynonymMap Names`);
  console.log(`************************`);
  for(const smName of listOfSynonymMapsNames) {
    console.log(`${smName}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
