// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list RecoveryJobResource resources by RecoveryJob
 *
 * @summary list RecoveryJobResource resources by RecoveryJob
 * x-ms-original-file: 2026-04-01-preview/RecoveryJobResources_List_MaximumSet_Gen.json
 */
async function recoveryJobResourcesListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.recoveryJobResources.list(
    "sampleServiceGroupName",
    "samplePlanName",
    "c56888ef-9ced-4001-a6d4-7145a0309bdb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await recoveryJobResourcesListMaximumSet();
}

main().catch(console.error);
