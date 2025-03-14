// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeZonesClient } from "@azure/arm-edgezones";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to unregisters a subscription for an Extended Zone
 *
 * @summary unregisters a subscription for an Extended Zone
 * x-ms-original-file: 2024-04-01-preview/ExtendedZones_Unregister.json
 */
async function unregisterExtendedZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a1ffc958-d2c7-493e-9f1e-125a0477f536";
  const client = new EdgeZonesClient(credential, subscriptionId);
  const result = await client.extendedZones.unregister("losangeles");
  console.log(result);
}

async function main(): Promise<void> {
  await unregisterExtendedZone();
}

main().catch(console.error);
