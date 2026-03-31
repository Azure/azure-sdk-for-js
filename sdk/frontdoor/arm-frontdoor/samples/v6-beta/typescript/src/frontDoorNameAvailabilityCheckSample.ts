// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check the availability of a Front Door resource name.
 *
 * @summary check the availability of a Front Door resource name.
 * x-ms-original-file: 2025-11-01/CheckFrontdoorNameAvailability.json
 */
async function checkNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential);
  const result = await client.frontDoorNameAvailability.check({
    name: "sampleName",
    type: "Microsoft.Network/frontDoors",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailability();
}

main().catch(console.error);
