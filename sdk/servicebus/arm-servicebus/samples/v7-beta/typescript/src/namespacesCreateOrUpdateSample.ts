// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a service namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 *
 * @summary creates or updates a service namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/SBNameSpaceCreate.json
 */
async function nameSpaceCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.namespaces.createOrUpdate("ArunMonocle", "sdk-Namespace2924", {
    location: "South Central US",
    properties: {
      geoDataReplication: {
        locations: [
          { locationName: "eastus", roleType: "Primary" },
          { locationName: "southcentralus", roleType: "Secondary" },
        ],
        maxReplicationLagDurationInSeconds: 300,
      },
      premiumMessagingPartitions: 2,
    },
    sku: { name: "Premium", capacity: 4, tier: "Premium" },
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceCreate();
}

main().catch(console.error);
