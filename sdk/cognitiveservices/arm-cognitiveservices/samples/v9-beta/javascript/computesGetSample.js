// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified compute associated with the Cognitive Services account.
 *
 * @summary gets the specified compute associated with the Cognitive Services account.
 * x-ms-original-file: 2026-03-15-preview/GetCompute.json
 */
async function getCompute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.computes.get("rgcognitiveservices", "myAccount", "myCompute");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified compute associated with the Cognitive Services account.
 *
 * @summary gets the specified compute associated with the Cognitive Services account.
 * x-ms-original-file: 2026-03-15-preview/GetContainerInstanceCompute.json
 */
async function getContainerInstanceCompute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.computes.get(
    "rgcognitiveservices",
    "myAccount",
    "myContainerInstance",
  );
  console.log(result);
}

async function main() {
  await getCompute();
  await getContainerInstanceCompute();
}

main().catch(console.error);
