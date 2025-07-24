// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of a specific Organization resource.
 *
 * @summary get the properties of a specific Organization resource.
 * x-ms-original-file: 2024-07-01/Organization_Get.json
 */
async function organizationGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.get("myResourceGroup", "myOrganization");
  console.log(result);
}

async function main(): Promise<void> {
  await organizationGet();
}

main().catch(console.error);
