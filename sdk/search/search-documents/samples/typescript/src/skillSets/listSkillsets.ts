// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SearchIndexerClient,
  AzureKeyCredential,
  SearchIndexerSkillset
} from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main(): Promise<void> {
  console.log(`Running List Skillsets Sample....`);

  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  const listOfSkillsets: Array<SearchIndexerSkillset> = await client.listSkillsets();

  console.log(`\tList of Skillsets`);
  console.log(`\t******************`);
  for (let skillset of listOfSkillsets) {
    console.log(`Name: ${skillset.name}`);
    console.log(`Description: ${skillset.description}`);
    console.log(`Skills`);
    console.log(`******`);
    for (let skill of skillset.skills) {
      console.log(`ODataType: ${skill.odatatype}`);
      console.log(`Inputs`);
      for (let input of skill.inputs) {
        console.log(`\tName: ${input.name}`);
        console.log(`\tSource: ${input.source}`);
      }
      console.log(`Outputs`);
      for (let output of skill.outputs) {
        console.log(`\tName: ${output.name}`);
        console.log(`\tTarget Name: ${output.targetName}`);
      }
    }
  }
}

main();
