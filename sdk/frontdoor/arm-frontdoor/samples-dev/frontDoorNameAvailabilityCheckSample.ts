// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check the availability of a Front Door resource name.
 *
 * @summary Check the availability of a Front Door resource name.
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2021-06-01/examples/CheckFrontdoorNameAvailability.json
 */

import type { CheckNameAvailabilityInput } from "@azure/arm-frontdoor";
import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function checkNameAvailability(): Promise<void> {
  const checkFrontDoorNameAvailabilityInput: CheckNameAvailabilityInput = {
    name: "sampleName",
    type: "Microsoft.Network/frontDoors",
  };
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential);
  const result = await client.frontDoorNameAvailability.check(checkFrontDoorNameAvailabilityInput);
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailability();
}

main().catch(console.error);
