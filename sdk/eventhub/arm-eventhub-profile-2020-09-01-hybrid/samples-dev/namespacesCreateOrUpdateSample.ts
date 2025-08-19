// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 *
 * @summary Creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2018-01-01-preview/examples/NameSpaces/EHNameSpaceCreate.json
 */

import type { EHNamespace } from "@azure/arm-eventhub-profile-2020-09-01-hybrid";
import { EventHubManagementClient } from "@azure/arm-eventhub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function namespaceCreate(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName = process.env["EVENTHUB_RESOURCE_GROUP"] || "ArunMonocle";
  const namespaceName = "sdk-Namespace-5849";
  const parameters: EHNamespace = {
    location: "South Central US",
    sku: { name: "Standard", tier: "Standard" },
    tags: { tag1: "value1", tag2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    namespaceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespaceCreate();
}

main().catch(console.error);
