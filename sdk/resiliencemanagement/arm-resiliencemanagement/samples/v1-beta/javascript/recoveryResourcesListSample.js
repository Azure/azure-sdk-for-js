// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list RecoveryResource resources by RecoveryPlan
 *
 * @summary list RecoveryResource resources by RecoveryPlan
 * x-ms-original-file: 2026-04-01-preview/RecoveryResources_List_MaximumSet_Gen.json
 */
async function recoveryResourcesListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.recoveryResources.list("sampleServiceGroupName", "plan1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await recoveryResourcesListMaximumSet();
}

main().catch(console.error);
