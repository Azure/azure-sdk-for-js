// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Organization role bindings
 *
 * @summary Organization role bindings
 * x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/stable/2024-02-13/examples/Access_DeleteRoleBinding.json
 */
async function accessDeleteRoleBinding(): Promise<void> {
  const subscriptionId =
    process.env["CONFLUENT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONFLUENT_RESOURCE_GROUP"] || "myResourceGroup";
  const organizationName = "myOrganization";
  const roleBindingId = "dlz-f3a90de";
  const credential = new DefaultAzureCredential();
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.deleteRoleBinding(
    resourceGroupName,
    organizationName,
    roleBindingId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await accessDeleteRoleBinding();
}

main().catch(console.error);
