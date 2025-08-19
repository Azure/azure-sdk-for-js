// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListAccessRequestModel } from "@azure/arm-confluent";
import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Organization service accounts details
 *
 * @summary Organization service accounts details
 * x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/stable/2024-02-13/examples/Access_ServiceAccountsList.json
 */
async function accessServiceAccountsList(): Promise<void> {
  const subscriptionId =
    process.env["CONFLUENT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONFLUENT_RESOURCE_GROUP"] || "myResourceGroup";
  const organizationName = "myOrganization";
  const body: ListAccessRequestModel = {
    searchFilters: { pageSize: "10", pageToken: "asc4fts4ft" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listServiceAccounts(resourceGroupName, organizationName, body);
  console.log(result);
}

async function main(): Promise<void> {
  await accessServiceAccountsList();
}

main().catch(console.error);
