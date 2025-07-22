// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerBIDedicatedClient } from "@azure/arm-powerbidedicated";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists eligible SKUs for PowerBI Dedicated resource provider.
 *
 * @summary lists eligible SKUs for PowerBI Dedicated resource provider.
 * x-ms-original-file: 2021-01-01/listSKUsForNew.json
 */
async function listEligibleSKUsForANewCapacity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  const result = await client.capacities.listSkus();
  console.log(result);
}

async function main(): Promise<void> {
  await listEligibleSKUsForANewCapacity();
}

main().catch(console.error);
