// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get available MaaS PTU quota.
 *
 * @summary get available MaaS PTU quota.
 * x-ms-original-file: 2026-03-15-preview/PTUQuota/getAvailable.json
 */
async function getAvailableMaaSPTUQuota() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.ptuQuota.getAvailable("location");
  console.log(result);
}

async function main() {
  await getAvailableMaaSPTUQuota();
}

main().catch(console.error);
