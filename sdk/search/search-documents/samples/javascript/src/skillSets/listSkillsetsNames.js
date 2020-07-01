// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { SearchIndexerClient, AzureKeyCredential } = require("@azure/search-documents");
require("dotenv").config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
  console.log(`Running List Skillsets Names Sample....`);

  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfSkillsetNames = await client.listSkillsetsNames();

  console.log(`\tNames of Skillsets`);
  console.log(`\t******************`);
  for(let skName of listOfSkillsetNames) {
    console.log(`${skName}`);
  }
}

main();
