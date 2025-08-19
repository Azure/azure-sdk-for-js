// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes API key of a kafka or schema registry cluster
 *
 * @summary Deletes API key of a kafka or schema registry cluster
 * x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/stable/2024-02-13/examples/Organization_DeleteClusterAPIKey.json
 */
async function organizationDeleteClusterApiKey(): Promise<void> {
  const subscriptionId =
    process.env["CONFLUENT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONFLUENT_RESOURCE_GROUP"] || "myResourceGroup";
  const organizationName = "myOrganization";
  const apiKeyId = "ZFZ6SZZZWGYBEIFB";
  const credential = new DefaultAzureCredential();
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.deleteClusterAPIKey(
    resourceGroupName,
    organizationName,
    apiKeyId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await organizationDeleteClusterApiKey();
}

main().catch(console.error);
