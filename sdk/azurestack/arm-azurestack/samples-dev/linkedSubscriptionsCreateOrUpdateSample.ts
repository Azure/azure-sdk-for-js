// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LinkedSubscriptionParameter } from "@azure/arm-azurestack";
import { AzureStackManagementClient } from "@azure/arm-azurestack";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Create or update a linked subscription resource.
 *
 * @summary Create or update a linked subscription resource.
 * x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/LinkedSubscription/Put.json
 */
async function createOrUpdateALinkedSubscription(): Promise<void> {
  const subscriptionId = "dd8597b4-8739-4467-8b10-f8679f62bfbf";
  const resourceGroup = "azurestack";
  const linkedSubscriptionName = "testLinkedSubscription";
  const resource: LinkedSubscriptionParameter = {
    linkedSubscriptionId: "104fbb77-2b0e-476a-83de-65ad8acd1f0b",
    location: "eastus",
    registrationResourceId:
      "/subscriptions/dd8597b4-8739-4467-8b10-f8679f62bfbf/resourceGroups/azurestack/providers/Microsoft.AzureStack/registrations/testRegistration",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureStackManagementClient(credential, subscriptionId);
  const result = await client.linkedSubscriptions.createOrUpdate(
    resourceGroup,
    linkedSubscriptionName,
    resource,
  );
  console.log(result);
}

createOrUpdateALinkedSubscription().catch(console.error);
