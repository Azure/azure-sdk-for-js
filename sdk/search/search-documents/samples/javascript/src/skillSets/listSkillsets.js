// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const {
  SearchIndexerClient,
  AzureKeyCredential
} = require("@azure/search-documents");
require("dotenv").config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
  console.log(`Running List Skillsets Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfSkillsets = await client.listSkillsets();

  console.log(`\tList of Skillsets`);
  console.log(`\t******************`);
  for(const skillset of listOfSkillsets) {
    console.log(`Name: ${skillset.name}`);
    console.log(`Description: ${skillset.description}`);
    console.log(`Skills`);
    console.log(`******`);
    for(const skill of skillset.skills) {
      console.log(`ODataType: ${skill.odatatype}`);
      console.log(`Inputs`);
      for(const input of skill.inputs) {
        console.log(`\tName: ${input.name}`);
        console.log(`\tSource: ${input.source}`);
      }
      console.log(`Outputs`);
      for(const output of skill.outputs) {
        console.log(`\tName: ${output.name}`);
        console.log(`\tTarget Name: ${output.targetName}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
