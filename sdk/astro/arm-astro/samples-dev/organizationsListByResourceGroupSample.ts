// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AstroManagementClient } from "@azure/arm-astro";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List OrganizationResource resources by resource group
 *
 * @summary List OrganizationResource resources by resource group
 * x-ms-original-file: specification/liftrastronomer/resource-manager/Astronomer.Astro/stable/2023-08-01/examples/Organizations_ListByResourceGroup_MaximumSet_Gen.json
 */
async function organizationsListByResourceGroupGeneratedByMaximumSetRule(): Promise<void> {
  const subscriptionId =
    process.env["ASTRO_SUBSCRIPTION_ID"] || "43454B17-172A-40FE-80FA-549EA23D12B3";
  const resourceGroupName = process.env["ASTRO_RESOURCE_GROUP"] || "rgastronomer";
  const credential = new DefaultAzureCredential();
  const client = new AstroManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await organizationsListByResourceGroupGeneratedByMaximumSetRule();
}

main().catch(console.error);
