// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SearchIndexerClient, AzureKeyCredential, SearchIndexerSkillset } from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main(): Promise<void> {
  console.log(`Running Create Skillset Sample....`);

  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  const skillset: SearchIndexerSkillset = {
    name: `my-azureblob-skillset`,
    description: `Skillset description`,
    skills: [
      {
        odatatype: "#Microsoft.Skills.Text.EntityRecognitionSkill",
        inputs: [
          {
            name: "text",
            source: "/document/merged_content"
          },
          {
            name: "languageCode",
            source: "/document/language"
          }
        ],
        outputs: [
          {
            name: "persons",
            targetName: "people"
          },
          {
            name: "organizations",
            targetName: "organizations"
          },
          {
            name: "locations",
            targetName: "locations"
          }
        ]
      }
    ]
  };
  await client.createSkillset(skillset);
}

main();
