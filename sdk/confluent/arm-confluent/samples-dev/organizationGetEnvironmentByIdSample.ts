// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get Environment details by environment Id
 *
 * @summary Get Environment details by environment Id
 * x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/stable/2024-02-13/examples/Organization_GetEnvironmentById.json
 */
async function organizationGetEnvironmentById(): Promise<void> {
  const subscriptionId =
    process.env["CONFLUENT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONFLUENT_RESOURCE_GROUP"] || "myResourceGroup";
  const organizationName = "myOrganization";
  const environmentId = "dlz-f3a90de";
  const credential = new DefaultAzureCredential();
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.getEnvironmentById(
    resourceGroupName,
    organizationName,
    environmentId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await organizationGetEnvironmentById();
}

main().catch(console.error);
