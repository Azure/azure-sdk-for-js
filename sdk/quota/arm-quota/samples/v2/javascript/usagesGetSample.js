// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the current usage of a resource.
 *
 * @summary get the current usage of a resource.
 * x-ms-original-file: 2025-09-01/getComputeOneSkuUsages.json
 */
async function quotasUsagesRequestForCompute() {
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const result = await client.usages.get(
    "subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Compute/locations/eastus",
    "standardNDSFamily",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the current usage of a resource.
 *
 * @summary get the current usage of a resource.
 * x-ms-original-file: 2025-09-01/getNetworkOneSkuUsages.json
 */
async function quotasUsagesRequestForNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.usages.get(
    "subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Network/locations/eastus",
    "MinPublicIpInterNetworkPrefixLength",
  );
  console.log(result);
}

async function main() {
  await quotasUsagesRequestForCompute();
  await quotasUsagesRequestForNetwork();
}

main().catch(console.error);
