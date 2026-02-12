// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves a single available sku for network virtual appliance.
 *
 * @summary Retrieves a single available sku for network virtual appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceSkuGet.json
 */
async function networkVirtualApplianceSkuGet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const skuName = "ciscoSdwan";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualApplianceSkus.get(skuName);
  console.log(result);
}

async function main(): Promise<void> {
  await networkVirtualApplianceSkuGet();
}

main().catch(console.error);
