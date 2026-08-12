// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list MaaS PTU usage and quota.
 *
 * @summary list MaaS PTU usage and quota.
 * x-ms-original-file: 2026-03-15-preview/PTUQuota/list.json
 */
async function listMaaSPTUUsageAndQuota() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ptuQuota.list("location")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listMaaSPTUUsageAndQuota();
}

main().catch(console.error);
