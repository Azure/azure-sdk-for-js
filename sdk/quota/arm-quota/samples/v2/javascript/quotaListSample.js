// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of current quota limits of all resources for the specified scope. The response from this GET operation can be leveraged to submit requests to update a quota.
 *
 * @summary get a list of current quota limits of all resources for the specified scope. The response from this GET operation can be leveraged to submit requests to update a quota.
 * x-ms-original-file: 2025-09-01/getComputeQuotaLimits.json
 */
async function quotasListQuotaLimitsForCompute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.quota.list(
    "subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Compute/locations/eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get a list of current quota limits of all resources for the specified scope. The response from this GET operation can be leveraged to submit requests to update a quota.
 *
 * @summary get a list of current quota limits of all resources for the specified scope. The response from this GET operation can be leveraged to submit requests to update a quota.
 * x-ms-original-file: 2025-09-01/getMachineLearningServicesQuotaLimits.json
 */
async function quotasListQuotaLimitsMachineLearningServices() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.quota.list(
    "subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.MachineLearningServices/locations/eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get a list of current quota limits of all resources for the specified scope. The response from this GET operation can be leveraged to submit requests to update a quota.
 *
 * @summary get a list of current quota limits of all resources for the specified scope. The response from this GET operation can be leveraged to submit requests to update a quota.
 * x-ms-original-file: 2025-09-01/getNetworkQuotaLimits.json
 */
async function quotasListQuotaLimitsForNetwork() {
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const resArray = new Array();
  for await (const item of client.quota.list(
    "subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Network/locations/eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await quotasListQuotaLimitsForCompute();
  await quotasListQuotaLimitsMachineLearningServices();
  await quotasListQuotaLimitsForNetwork();
}

main().catch(console.error);
