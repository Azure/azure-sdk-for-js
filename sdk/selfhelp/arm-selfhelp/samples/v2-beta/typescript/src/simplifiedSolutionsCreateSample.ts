// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates Simplified Solutions for an Azure subscription using 'solutionId' from Discovery Solutions as the input. <br/><br/> Simplified Solutions API makes the consumption of solutions APIs easier while still providing access to the same powerful solutions rendered in Solutions API. With Simplified Solutions, users don't have to worry about stitching together the article using replacement maps and can use the content in the API response to directly render as HTML content.<br/>
 *
 * @summary creates Simplified Solutions for an Azure subscription using 'solutionId' from Discovery Solutions as the input. <br/><br/> Simplified Solutions API makes the consumption of solutions APIs easier while still providing access to the same powerful solutions rendered in Solutions API. With Simplified Solutions, users don't have to worry about stitching together the article using replacement maps and can use the content in the API response to directly render as HTML content.<br/>
 * x-ms-original-file: 2024-03-01-preview/SimplifiedSolutions_Create.json
 */
async function solutionCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.simplifiedSolutions.create(
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp",
    "simplifiedSolutionsResourceName1",
    {
      simplifiedSolutionsRequestBody: {
        parameters: {
          resourceUri:
            "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp",
        },
        solutionId: "sampleSolutionId",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionCreate();
}

main().catch(console.error);
