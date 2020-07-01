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
  listOfSkillsets.forEach((skillset) => {
    console.log(`Name: ${skillset.name}`);
    console.log(`Description: ${skillset.description}`);
    console.log(`Skills`);
    console.log(`******`);
    skillset.skills.forEach((skill) => {
      console.log(`ODataType: ${skill.odatatype}`);
      console.log(`Inputs`);
      skill.inputs.forEach((input) => {
        console.log(`\tName: ${input.name}`);
        console.log(`\tSource: ${input.source}`);
      });
      console.log(`Outputs`);
      skill.outputs.forEach((output) => {
        console.log(`\tName: ${output.name}`);
        console.log(`\tTarget Name: ${output.targetName}`);
      });
    });
  });
}

main();
