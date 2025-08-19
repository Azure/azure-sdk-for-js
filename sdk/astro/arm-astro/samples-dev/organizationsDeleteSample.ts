// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AstroManagementClient } from "@azure/arm-astro";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete a OrganizationResource
 *
 * @summary Delete a OrganizationResource
 * x-ms-original-file: specification/liftrastronomer/resource-manager/Astronomer.Astro/stable/2023-08-01/examples/Organizations_Delete_MaximumSet_Gen.json
 */
async function organizationsDeleteGeneratedByMaximumSetRule(): Promise<void> {
  const subscriptionId =
    process.env["ASTRO_SUBSCRIPTION_ID"] || "43454B17-172A-40FE-80FA-549EA23D12B3";
  const resourceGroupName = process.env["ASTRO_RESOURCE_GROUP"] || "rgastronomer";
  const organizationName = "q:";
  const credential = new DefaultAzureCredential();
  const client = new AstroManagementClient(credential, subscriptionId);
  const result = await client.organizations.beginDeleteAndWait(resourceGroupName, organizationName);
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
