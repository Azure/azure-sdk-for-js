// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a service namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 *
 * @summary updates a service namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/SBNameSpaceUpdate.json
 */
async function nameSpaceUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.namespaces.update("ArunMonocle", "sdk-Namespace-3285", {
    location: "South Central US",
    tags: { tag3: "value3", tag4: "value4" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceUpdate();
}

main().catch(console.error);
