// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all SKUs available for a virtual appliance.
 *
 * @summary list all SKUs available for a virtual appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceSkuList.json
 */
async function networkVirtualApplianceSkuListResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualApplianceSkus.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkVirtualApplianceSkuListResult();
}

main().catch(console.error);
