// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists eligible SKUs for PowerBI Dedicated resource provider.
 *
 * @summary Lists eligible SKUs for PowerBI Dedicated resource provider.
 * x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listSKUsForNew.json
 */

import { PowerBIDedicated } from "@azure/arm-powerbidedicated";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listEligibleSkUsForANewCapacity(): Promise<void> {
  const subscriptionId =
    process.env["POWERBIDEDICATED_SUBSCRIPTION_ID"] || "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const credential = new DefaultAzureCredential();
  const client = new PowerBIDedicated(credential, subscriptionId);
  const result = await client.capacities.listSkus();
  console.log(result);
}

async function main(): Promise<void> {
  await listEligibleSkUsForANewCapacity();
}

main().catch(console.error);
