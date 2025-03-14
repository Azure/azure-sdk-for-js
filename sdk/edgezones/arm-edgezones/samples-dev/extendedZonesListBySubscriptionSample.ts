// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeZonesClient } from "@azure/arm-edgezones";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the Azure Extended Zones available to a subscription
 *
 * @summary lists the Azure Extended Zones available to a subscription
 * x-ms-original-file: 2024-04-01-preview/ExtendedZones_ListBySubscription.json
 */
async function listExtendedZones(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a1ffc958-d2c7-493e-9f1e-125a0477f536";
  const client = new EdgeZonesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.extendedZones.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listExtendedZones();
}

main().catch(console.error);
