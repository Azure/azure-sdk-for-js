// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { SearchIndexerClient, AzureKeyCredential } = require("@azure/search-documents");
require("dotenv").config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
  console.log(`Running List Skillsets Names Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfSkillsetNames = await client.listSkillsetsNames();

  console.log(`\tNames of Skillsets`);
  console.log(`\t******************`);
  for(const skName of listOfSkillsetNames) {
    console.log(`${skName}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
