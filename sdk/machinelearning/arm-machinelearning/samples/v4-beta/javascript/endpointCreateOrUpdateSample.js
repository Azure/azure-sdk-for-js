// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update endpoint resource with the specified parameters
 *
 * @summary create or update endpoint resource with the specified parameters
 * x-ms-original-file: 2026-03-15-preview/Endpoint/create.json
 */
async function createEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.endpoint.createOrUpdate(
    "test-rg",
    "aml-workspace-name",
    "Azure.OpenAI",
    {
      properties: {
        name: "Azure.OpenAI",
        associatedResourceId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/test-rg/providers/Microsoft.CognitiveService/account/account-1",
        endpointType: "Azure.OpenAI",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createEndpoint();
}

main().catch(console.error);
