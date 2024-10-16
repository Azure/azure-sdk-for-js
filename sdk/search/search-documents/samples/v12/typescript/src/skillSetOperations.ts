// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the Skillset Operations.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { SearchIndexerClient, SearchIndexerSkillset } from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";

const TEST_SKILLSET_NAME = "example-skillset-sample-1";

async function createSkillset(skillsetName: string, client: SearchIndexerClient): Promise<void> {
  console.log(`Creating Skillset Operation`);
  const skillset: SearchIndexerSkillset = {
    name: skillsetName,
    description: `Skillset description`,
    skills: [
      {
        odatatype: "#Microsoft.Skills.Text.V3.EntityRecognitionSkill",
        inputs: [
          {
            name: "text",
            source: "/document/merged_content",
          },
          {
            name: "languageCode",
            source: "/document/language",
          },
        ],
        outputs: [
          {
            name: "persons",
            targetName: "people",
          },
          {
            name: "organizations",
            targetName: "organizations",
          },
          {
            name: "locations",
            targetName: "locations",
          },
        ],
      },
    ],
  };
  await client.createSkillset(skillset);
}

async function getAndUpdateSkillset(
  skillsetName: string,
  client: SearchIndexerClient,
): Promise<void> {
  console.log(`Get And Update Skillset Operation`);
  const skillset: SearchIndexerSkillset = await client.getSkillset(skillsetName);

  skillset.skills[0].outputs = [
    {
      name: "persons",
      targetName: "people",
    },
    {
      name: "organizations",
      targetName: "organizations",
    },
  ];

  await client.createOrUpdateSkillset(skillset);
}

async function listSkillsets(client: SearchIndexerClient): Promise<void> {
  console.log(`List Skillset Operation`);
  const listOfSkillsets: Array<SearchIndexerSkillset> = await client.listSkillsets();

  console.log(`\tList of Skillsets`);
  console.log(`\t******************`);
  for (const skillset of listOfSkillsets) {
    console.log(`Name: ${skillset.name}`);
    console.log(`Description: ${skillset.description}`);
    console.log(`Skills`);
    console.log(`******`);
    for (const skill of skillset.skills) {
      console.log(`ODataType: ${skill.odatatype}`);
      console.log(`Inputs`);
      for (const input of skill.inputs) {
        console.log(`\tName: ${input.name}`);
        console.log(`\tSource: ${input.source}`);
      }
      console.log(`Outputs`);
      for (const output of skill.outputs) {
        console.log(`\tName: ${output.name}`);
        console.log(`\tTarget Name: ${output.targetName}`);
      }
    }
  }
}

async function deleteSkillset(skillsetName: string, client: SearchIndexerClient): Promise<void> {
  console.log(`Deleting Skillset Operation`);
  await client.deleteSkillset(skillsetName);
}

async function main(): Promise<void> {
  console.log(`Running Skillset Operations Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid endpoint with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new DefaultAzureCredential());
  try {
    await createSkillset(TEST_SKILLSET_NAME, client);
    await getAndUpdateSkillset(TEST_SKILLSET_NAME, client);
    await listSkillsets(client);
  } finally {
    await deleteSkillset(TEST_SKILLSET_NAME, client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
