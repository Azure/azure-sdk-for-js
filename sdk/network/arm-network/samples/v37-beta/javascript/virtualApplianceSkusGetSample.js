// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves a single available sku for network virtual appliance.
 *
 * @summary retrieves a single available sku for network virtual appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceSkuGet.json
 */
async function networkVirtualApplianceSkuGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualApplianceSkus.get("ciscoSdwan");
  console.log(result);
}

async function main() {
  await networkVirtualApplianceSkuGet();
}

main().catch(console.error);
