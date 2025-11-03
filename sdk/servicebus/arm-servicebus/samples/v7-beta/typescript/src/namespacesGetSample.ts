// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a description for the specified namespace.
 *
 * @summary gets a description for the specified namespace.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/SBNameSpaceGet.json
 */
async function nameSpaceGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.namespaces.get("ArunMonocle", "sdk-Namespace-2924");
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceGet();
}

main().catch(console.error);
