// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary update the state of specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-03-15-preview/Endpoint/RaiPolicy/create.json
 */
async function createRaiPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.raiPolicy.create(
    "test-rg",
    "aml-workspace-name",
    "Azure.OpenAI",
    "raiPolicyName",
    {
      properties: {
        type: "SystemManaged",
        basePolicyName: "112",
        completionBlocklists: [{ blocking: false, blocklistName: "blocklistName" }],
        contentFilters: [
          {
            name: "policyName",
            allowedContentLevel: "Low",
            blocking: false,
            enabled: false,
            source: "Prompt",
          },
        ],
        mode: "Blocking",
        promptBlocklists: [{ blocking: false, blocklistName: "blocklistName" }],
      },
    },
  );
  console.log(result);
}

async function main() {
  await createRaiPolicy();
}

main().catch(console.error);
