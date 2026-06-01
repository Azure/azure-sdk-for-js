// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list managed compute quota usages for a subscription and location.
 *
 * @summary list managed compute quota usages for a subscription and location.
 * x-ms-original-file: 2026-03-15-preview/ListManagedComputeUsages.json
 */
async function listManagedComputeUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedComputeUsagesOperationGroup.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedComputeUsages();
}

main().catch(console.error);
