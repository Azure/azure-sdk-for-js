// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check the availability of a Front Door subdomain.
 *
 * @summary Check the availability of a Front Door subdomain.
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2021-06-01/examples/CheckFrontdoorNameAvailabilityWithSubscription.json
 */

import type { CheckNameAvailabilityInput } from "@azure/arm-frontdoor";
import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function checkNameAvailabilityWithSubscription(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const checkFrontDoorNameAvailabilityInput: CheckNameAvailabilityInput = {
    name: "sampleName",
    type: "Microsoft.Network/frontDoors/frontendEndpoints",
  };
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.frontDoorNameAvailabilityWithSubscription.check(
    checkFrontDoorNameAvailabilityInput,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailabilityWithSubscription();
}

main().catch(console.error);
