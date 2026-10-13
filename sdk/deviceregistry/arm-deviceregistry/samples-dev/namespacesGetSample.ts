// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Namespace
 *
 * @summary get a Namespace
 * x-ms-original-file: 2026-11-01/Get_Namespace.json
 */
async function getANamespace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaces.get("myResourceGroup", "mynamespace");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Namespace
 *
 * @summary get a Namespace
 * x-ms-original-file: 2026-11-01/Get_Namespace_With_FailedLinkingEndpoint.json
 */
async function getANamespaceWithAFailedLinkingEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaces.get("myResourceGroup", "my-namespace");
  console.log(result);
}

async function main(): Promise<void> {
  await getANamespace();
  await getANamespaceWithAFailedLinkingEndpoint();
}

main().catch(console.error);
