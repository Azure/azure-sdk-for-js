// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get API key details of a kafka or schema registry cluster
 *
 * @summary get API key details of a kafka or schema registry cluster
 * x-ms-original-file: 2024-07-01/Organization_GetClusterAPIKey.json
 */
async function organizationGetClusterAPIKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.getClusterAPIKey(
    "myResourceGroup",
    "myOrganization",
    "apiKeyId-123",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await organizationGetClusterAPIKey();
}

main().catch(console.error);
