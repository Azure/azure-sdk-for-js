// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a compute associated with the Cognitive Services account.
 *
 * @summary updates a compute associated with the Cognitive Services account.
 * x-ms-original-file: 2026-05-15-preview/UpdateCompute.json
 */
async function updateCompute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.computes.update("rgcognitiveservices", "myAccount", "myCompute", {
    properties: {
      computeType: "Cluster",
      pools: [
        { name: "default", vmPriority: "Regular", instanceType: "Standard_DS3_v2", nodeCount: 4 },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await updateCompute();
}

main().catch(console.error);
