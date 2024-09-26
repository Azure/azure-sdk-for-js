// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { EdgeZonesClient } = require("@azure/arm-edgezones");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to unregisters a subscription for an Extended Zone
 *
 * @summary unregisters a subscription for an Extended Zone
 * x-ms-original-file: 2024-04-01-preview/ExtendedZones_Unregister.json
 */
async function unregisterExtendedZone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a1ffc958-d2c7-493e-9f1e-125a0477f536";
  const client = new EdgeZonesClient(credential, subscriptionId);
  const result = await client.extendedZones.unregister("losangeles");
  console.log(result);
}

async function main() {
  unregisterExtendedZone();
}

main().catch(console.error);
