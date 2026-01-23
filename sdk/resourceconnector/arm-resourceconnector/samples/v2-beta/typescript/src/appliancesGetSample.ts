// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceConnectorManagementClient } from "@azure/arm-resourceconnector";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of an Appliance with a specified resource group and name.
 *
 * @summary gets the details of an Appliance with a specified resource group and name.
 * x-ms-original-file: 2025-03-01-preview/AppliancesGet.json
 */
async function getAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  const result = await client.appliances.get("testresourcegroup", "appliance01");
  console.log(result);
}

async function main(): Promise<void> {
  await getAppliance();
}

main().catch(console.error);
