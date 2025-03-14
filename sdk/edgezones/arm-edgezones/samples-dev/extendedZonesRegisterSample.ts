// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeZonesClient } from "@azure/arm-edgezones";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to registers a subscription for an Extended Zone
 *
 * @summary registers a subscription for an Extended Zone
 * x-ms-original-file: 2024-04-01-preview/ExtendedZones_Register.json
 */
async function registerExtendedZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a1ffc958-d2c7-493e-9f1e-125a0477f536";
  const client = new EdgeZonesClient(credential, subscriptionId);
  const result = await client.extendedZones.register("losangeles");
  console.log(result);
}

async function main(): Promise<void> {
  await registerExtendedZone();
}

main().catch(console.error);
