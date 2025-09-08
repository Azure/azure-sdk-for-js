// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Validates the custom domain mapping to ensure it maps to the correct Front Door endpoint in DNS.
 *
 * @summary Validates the custom domain mapping to ensure it maps to the correct Front Door endpoint in DNS.
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2021-06-01/examples/FrontdoorValidateCustomDomain.json
 */

import type { ValidateCustomDomainInput } from "@azure/arm-frontdoor";
import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function frontDoorValidateCustomDomain(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "rg1";
  const frontDoorName = "frontDoor1";
  const customDomainProperties: ValidateCustomDomainInput = {
    hostName: "www.someDomain.com",
  };
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.frontDoors.validateCustomDomain(
    resourceGroupName,
    frontDoorName,
    customDomainProperties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await frontDoorValidateCustomDomain();
}

main().catch(console.error);
