// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeZonesClient } from "@azure/arm-edgezones";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an Azure Extended Zone for a subscription
 *
 * @summary gets an Azure Extended Zone for a subscription
 * x-ms-original-file: 2024-04-01-preview/ExtendedZones_Get.json
 */
async function getExtendedZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a1ffc958-d2c7-493e-9f1e-125a0477f536";
  const client = new EdgeZonesClient(credential, subscriptionId);
  const result = await client.extendedZones.get("losangeles");
  console.log(result);
}

async function main(): Promise<void> {
  await getExtendedZone();
}

main().catch(console.error);
