// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { SearchIndexerClient, AzureKeyCredential } = require("@azure/search-documents");
require("dotenv").config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
  console.log(`Running Get Skillset Sample....`);

  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  console.log(`Getting Skillset my-azureblob-skillset`);
  const skillset = await client.getSkillset("my-azureblob-skillset");
  console.log(`Name: ${skillset.name}`);
  console.log(`Description: ${skillset.description}`);
  console.log(`Skills`);
  console.log(`******`);
  for(let skill of skillset.skills) {
    console.log(`ODataType: ${skill.odatatype}`);
    console.log(`Inputs`);
    for(let input of skill.inputs) {
      console.log(`\tName: ${input.name}`);
      console.log(`\tSource: ${input.source}`);
    }
    console.log(`Outputs`);
    for(let output of skill.outputs) {
      console.log(`\tName: ${output.name}`);
      console.log(`\tTarget Name: ${output.targetName}`);
    }
  }
}

main();
