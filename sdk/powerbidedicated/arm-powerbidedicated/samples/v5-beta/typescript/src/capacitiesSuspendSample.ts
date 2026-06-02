// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerBIDedicated } from "@azure/arm-powerbidedicated";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to suspends operation of the specified dedicated capacity instance.
 *
 * @summary suspends operation of the specified dedicated capacity instance.
 * x-ms-original-file: 2021-01-01/suspendCapacity.json
 */
async function suspendCapacity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicated(credential, subscriptionId);
  await client.capacities.suspend("TestRG", "azsdktest");
}

async function main(): Promise<void> {
  await suspendCapacity();
}

main().catch(console.error);
