// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the current usage of a resource.
 *
 * @summary Get the current usage of a resource.
 * x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/stable/2025-03-01/examples/getComputeOneSkuUsages.json
 */

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function quotasUsagesRequestForCompute(): Promise<void> {
  const resourceName = "standardNDSFamily";
  const scope =
    "subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Compute/locations/eastus";
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const result = await client.usages.get(resourceName, scope);
  console.log(result);
}

/**
 * This sample demonstrates how to Get the current usage of a resource.
 *
 * @summary Get the current usage of a resource.
 * x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/stable/2025-03-01/examples/getNetworkOneSkuUsages.json
 */
async function quotasUsagesRequestForNetwork(): Promise<void> {
  const resourceName = "MinPublicIpInterNetworkPrefixLength";
  const scope =
    "subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Network/locations/eastus";
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const result = await client.usages.get(resourceName, scope);
  console.log(result);
}

async function main(): Promise<void> {
  await quotasUsagesRequestForCompute();
  await quotasUsagesRequestForNetwork();
}

main().catch(console.error);
