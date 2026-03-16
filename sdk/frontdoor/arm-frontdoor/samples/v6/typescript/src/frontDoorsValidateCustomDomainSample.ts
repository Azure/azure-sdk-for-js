// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates the custom domain mapping to ensure it maps to the correct Front Door endpoint in DNS.
 *
 * @summary validates the custom domain mapping to ensure it maps to the correct Front Door endpoint in DNS.
 * x-ms-original-file: 2025-10-01/FrontdoorValidateCustomDomain.json
 */
async function frontDoorValidateCustomDomain(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.frontDoors.validateCustomDomain("rg1", "frontDoor1", {
    hostName: "www.someDomain.com",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await frontDoorValidateCustomDomain();
}

main().catch(console.error);
