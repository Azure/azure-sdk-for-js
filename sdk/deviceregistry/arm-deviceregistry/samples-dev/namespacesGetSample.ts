// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Namespace
 *
 * @summary get a Namespace
 * x-ms-original-file: 2025-10-01/Get_Namespace.json
 */
async function getNamespace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaces.get("myResourceGroup", "adr-namespace-gbk0925-n01");
  console.log(result);
}

async function main(): Promise<void> {
  await getNamespace();
}

main().catch(console.error);
