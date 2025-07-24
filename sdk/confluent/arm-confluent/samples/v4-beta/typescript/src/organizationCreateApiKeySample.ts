// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates API key for a schema registry Cluster ID or Kafka Cluster ID under a environment
 *
 * @summary creates API key for a schema registry Cluster ID or Kafka Cluster ID under a environment
 * x-ms-original-file: 2024-07-01/Organization_CreateClusterAPIKey.json
 */
async function organizationCreateClusterAPIKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.createApiKey(
    "myResourceGroup",
    "myOrganization",
    "env-12132",
    "clusterId-123",
    {
      name: "CI kafka access key",
      description: "This API key provides kafka access to cluster x",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await organizationCreateClusterAPIKey();
}

main().catch(console.error);
