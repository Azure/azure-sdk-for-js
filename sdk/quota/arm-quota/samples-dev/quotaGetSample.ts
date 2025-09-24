// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the quota limit of a resource. The response can be used to determine the remaining quota to calculate a new quota limit that can be submitted with a PUT request.
 *
 * @summary get the quota limit of a resource. The response can be used to determine the remaining quota to calculate a new quota limit that can be submitted with a PUT request.
 * x-ms-original-file: 2025-09-01/getComputeOneSkuQuotaLimit.json
 */
async function quotasGetRequestForCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.quota.get(
    "subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Compute/locations/eastus",
    "standardNDSFamily",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the quota limit of a resource. The response can be used to determine the remaining quota to calculate a new quota limit that can be submitted with a PUT request.
 *
 * @summary get the quota limit of a resource. The response can be used to determine the remaining quota to calculate a new quota limit that can be submitted with a PUT request.
 * x-ms-original-file: 2025-09-01/getNetworkOneSkuQuotaLimit.json
 */
async function quotasUsagesRequestForNetwork(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const result = await client.quota.get(
    "subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Network/locations/eastus",
    "MinPublicIpInterNetworkPrefixLength",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await quotasGetRequestForCompute();
  await quotasUsagesRequestForNetwork();
}

main().catch(console.error);
