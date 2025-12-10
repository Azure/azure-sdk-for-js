// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Namespace
 *
 * @summary delete a Namespace
 * x-ms-original-file: 2025-10-01/Delete_Namespace.json
 */
async function deleteNamespace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.namespaces.delete("myResourceGroup", "adr-namespace-gbk0925-n01");
}

async function main(): Promise<void> {
  await deleteNamespace();
}

main().catch(console.error);
